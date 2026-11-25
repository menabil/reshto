const ACCOUNTS_KEY = "reshto-auth-accounts-v1";
const SESSION_KEY = "reshto-user";
const ADMIN_EMAIL = "resto@gmail.com";
const PASSWORD_ITERATIONS = 210000;

const getRoleForEmail = (email) =>
  email.trim().toLowerCase() === ADMIN_EMAIL ? "admin" : "user";

const getCrypto = () => {
  if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
    throw new Error("Secure browser storage is unavailable. Use HTTPS to continue.");
  }
  return globalThis.crypto;
};

const encodeBase64 = (bytes) =>
  btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""));

const decodeBase64 = (value) =>
  Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

const hashPassword = async (password, salt) => {
  const cryptoApi = getCrypto();
  const key = await cryptoApi.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await cryptoApi.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PASSWORD_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return new Uint8Array(hash);
};

const readAccounts = () => {
  const rawAccounts = localStorage.getItem(ACCOUNTS_KEY);
  if (!rawAccounts) return [];

  const accounts = JSON.parse(rawAccounts);
  if (
    !Array.isArray(accounts) ||
    accounts.some(
      (account) =>
        !account ||
        typeof account.id !== "string" ||
        typeof account.email !== "string" ||
        typeof account.passwordSalt !== "string" ||
        typeof account.passwordHash !== "string",
    )
  ) {
    throw new Error("Saved account data is invalid. Clear this site's data and register again.");
  }

  return accounts;
};

const toPublicUser = ({ passwordSalt, passwordHash, ...user }) => ({
  ...user,
  role: getRoleForEmail(user.email),
});

const createUserId = () => {
  const bytes = getCrypto().getRandomValues(new Uint8Array(8));
  return `USR-${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
};

export const restoreFrontendSession = () => {
  const rawSession = localStorage.getItem(SESSION_KEY);
  if (!rawSession) return null;

  const savedSession = JSON.parse(rawSession);
  if (!savedSession || typeof savedSession.id !== "string") {
    throw new Error("Saved sign-in session is invalid. Please sign in again.");
  }

  const account = readAccounts().find((candidate) => candidate.id === savedSession.id);
  if (!account) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }

  return toPublicUser(account);
};

export const registerFrontendAccount = async ({
  name,
  email,
  phone,
  password,
}) => {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail) {
    return { success: false, error: "Enter your name and email address." };
  }
  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  try {
    const accounts = readAccounts();
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return {
        success: false,
        error: "An account with this email already exists. Sign in instead.",
      };
    }

    const salt = getCrypto().getRandomValues(new Uint8Array(16));
    const passwordHash = await hashPassword(password, salt);
    const account = {
      id: createUserId(),
      name: normalizedName,
      email: normalizedEmail,
      phone: phone.trim(),
      role: getRoleForEmail(normalizedEmail),
      createdAt: new Date().toISOString(),
      passwordSalt: encodeBase64(salt),
      passwordHash: encodeBase64(passwordHash),
    };

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
    localStorage.setItem(SESSION_KEY, JSON.stringify(toPublicUser(account)));
    return { success: true, user: toPublicUser(account) };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not create your account. Please try again.",
    };
  }
};

export const loginFrontendAccount = async ({ email, password }) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readAccounts();
    const account = accounts.find(
      (candidate) => candidate.email === normalizedEmail,
    );
    if (!account) {
      return { success: false, error: "Email or password is incorrect." };
    }

    const actualHash = await hashPassword(
      password,
      decodeBase64(account.passwordSalt),
    );
    const expectedHash = decodeBase64(account.passwordHash);
    const matches =
      actualHash.length === expectedHash.length &&
      actualHash.reduce((difference, byte, index) => difference | (byte ^ expectedHash[index]), 0) === 0;

    if (!matches) {
      return { success: false, error: "Email or password is incorrect." };
    }

    account.role = getRoleForEmail(account.email);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    const user = toPublicUser(account);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not sign in. Please try again.",
    };
  }
};

export const updateFrontendProfile = ({
  userId,
  name,
  email,
  phone,
  address,
}) => {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedName || !normalizedEmail) {
    return { success: false, error: "Name and email are required." };
  }

  try {
    const accounts = readAccounts();
    const accountIndex = accounts.findIndex((account) => account.id === userId);
    if (accountIndex < 0) {
      return { success: false, error: "Account not found. Please sign in again." };
    }
    if (
      accounts.some(
        (account) => account.id !== userId && account.email === normalizedEmail,
      )
    ) {
      return { success: false, error: "That email is already in use." };
    }

    const updatedAccount = {
      ...accounts[accountIndex],
      name: normalizedName,
      email: normalizedEmail,
      phone: phone.trim(),
      address: address.trim(),
      role: getRoleForEmail(normalizedEmail),
    };
    const updatedAccounts = [...accounts];
    updatedAccounts[accountIndex] = updatedAccount;

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    const user = toPublicUser(updatedAccount);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not save your profile. Please try again.",
    };
  }
};

export const clearFrontendSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
