"use client";

export const NewsletterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert("Thank you for subscribing to Reshto newsletter!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1 pl-4"
    >
      <i className="ri-mail-send-line text-brand" />
      <input
        type="email"
        required
        placeholder="Your email address"
        className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
      />
      <button type="submit" className="btn-brand px-5! py-2.5! text-xs!">
        Subscribe
      </button>
    </form>
  );
};
