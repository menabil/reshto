"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { menu, menuTabs } from "@/data/data";

const StoreContext = createContext(null);

// Flatten all dishes from data.js as initial menu
const INITIAL_MENU_ITEMS = menuTabs.flatMap((tab) =>
  (menu[tab.key] || []).map((item) => ({
    ...item,
    category: tab.key,
    categoryLabel: tab.label,
    cartId: `${tab.key}-${item.id}`,
    inStock: true,
  }))
);

// Initial Mock Orders (connected across user and admin)
const INITIAL_ORDERS = [
  {
    id: "ORD-9421",
    customer: "Tahmid Hassan",
    email: "tahmid@example.com",
    phone: "+880 1711-234567",
    address: "House 24, Road 7, Banani, Dhaka",
    items: [
      { name: "Classic Margherita Pizza", qty: 2, price: "$15.00" },
      { name: "Fresh Mint Lemonade", qty: 2, price: "$4.00" },
    ],
    itemsSummary: "Classic Margherita Pizza x2, Fresh Mint Lemonade x2",
    subtotal: "$38.00",
    total: "$38.00",
    status: "Preparing",
    type: "Delivery",
    date: "Today, 7:15 PM",
    createdAt: Date.now() - 600000,
  },
  {
    id: "ORD-9420",
    customer: "Sadia Islam",
    email: "sadia@example.com",
    phone: "+880 1799-887766",
    address: "Dine-in Table 2",
    items: [
      { name: "Prime Ribeye Steak", qty: 1, price: "$28.00" },
      { name: "Dark Chocolate Cake", qty: 1, price: "$8.00" },
    ],
    itemsSummary: "Prime Ribeye Steak x1, Dark Chocolate Cake x1",
    subtotal: "$36.00",
    total: "$36.00",
    status: "Pending",
    type: "Dine-in",
    date: "Today, 6:45 PM",
    createdAt: Date.now() - 1500000,
  },
  {
    id: "ORD-9419",
    customer: "Michael Tan",
    email: "michael@example.com",
    phone: "+1 415-555-8912",
    address: "Mason City, IA 50401",
    items: [
      { name: "Grilled Chicken Sandwich", qty: 2, price: "$16.00" },
      { name: "Special Coffee", qty: 2, price: "$3.00" },
    ],
    itemsSummary: "Grilled Chicken Sandwich x2, Special Coffee x2",
    subtotal: "$38.00",
    total: "$38.00",
    status: "Delivered",
    type: "Delivery",
    date: "Today, 5:30 PM",
    createdAt: Date.now() - 3600000,
  },
  {
    id: "ORD-9418",
    customer: "Tahmid Hassan",
    email: "tahmid@example.com",
    phone: "+880 1711-234567",
    address: "House 24, Road 7, Banani, Dhaka",
    items: [
      { name: "Pan-Seared Salmon", qty: 1, price: "$26.00" },
      { name: "Greek Salad", qty: 1, price: "$14.00" },
    ],
    itemsSummary: "Pan-Seared Salmon x1, Greek Salad x1",
    subtotal: "$40.00",
    total: "$40.00",
    status: "Delivered",
    type: "Delivery",
    date: "Yesterday, 8:00 PM",
    createdAt: Date.now() - 86400000,
  },
];

// Initial Mock Reservations
const INITIAL_RESERVATIONS = [
  {
    id: "RES-101",
    guestName: "Tahmid Hassan",
    email: "tahmid@example.com",
    phone: "+880 1711-234567",
    guests: 4,
    date: "Today, 7:30 PM",
    table: "Table 6 (Patio Garden)",
    occasion: "Family Dinner",
    status: "Confirmed",
    createdAt: Date.now() - 7200000,
  },
  {
    id: "RES-102",
    guestName: "Emma Watson",
    email: "emma@example.com",
    phone: "+1 415-888-2931",
    guests: 2,
    date: "Today, 8:15 PM",
    table: "Table 2 (Window)",
    occasion: "Date Night",
    status: "Confirmed",
    createdAt: Date.now() - 14400000,
  },
  {
    id: "RES-103",
    guestName: "Arifur Rahman",
    email: "arif@example.com",
    phone: "+880 1819-992211",
    guests: 6,
    date: "Tomorrow, 1:00 PM",
    table: "Table 11 (Private Hall)",
    occasion: "Business Lunch",
    status: "Pending",
    createdAt: Date.now() - 28800000,
  },
];

const INITIAL_FAVORITES = [1, 4, 7];

const INITIAL_REVIEWS = [
  {
    id: "REV-101",
    dishId: 1,
    dishName: "Classic Margherita Pizza",
    customerName: "Tahmid Hassan",
    rating: 5,
    comment: "The crust is authentically crispy with that distinct wood-fired aroma. Fresh basil and mozzarella were top tier!",
    date: "Yesterday",
    createdAt: 1740000000000,
  },
  {
    id: "REV-102",
    dishId: 4,
    dishName: "Prime Cut Steak",
    customerName: "Sadia Islam",
    rating: 5,
    comment: "Cooked to medium-rare perfection. Juicy, flavorful garlic rosemary butter sauce.",
    date: "2 days ago",
    createdAt: 1739900000000,
  },
  {
    id: "REV-103",
    dishId: 2,
    dishName: "Spaghetti Carbonara",
    customerName: "Michael Tan",
    rating: 4,
    comment: "Creamy, rich and great texture of the pasta. Loved the fresh cured pancetta flavor.",
    date: "3 days ago",
    createdAt: 1739800000000,
  },
];

export const StoreProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load saved state from localStorage on client mount
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const savedMenu = localStorage.getItem("reshto-menu");
      if (savedMenu) setMenuItems(JSON.parse(savedMenu));

      const savedCart = localStorage.getItem("reshto-cart");
      if (savedCart) setQuantities(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem("reshto-orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedReservations = localStorage.getItem("reshto-reservations");
      if (savedReservations) setReservations(JSON.parse(savedReservations));

      const savedFavorites = localStorage.getItem("reshto-favorites");
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

      const savedReviews = localStorage.getItem("reshto-reviews");
      if (savedReviews) setReviews(JSON.parse(savedReviews));
    } catch {
      // ignore parsing errors
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Save changes to localStorage when state updates
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // storage unavailable
    }
  };

  // --- CART OPERATIONS ---
  const updateQuantity = (cartId, amount) => {
    setQuantities((current) => {
      const newQty = (current[cartId] || 0) + amount;
      const next = { ...current };
      if (newQty > 0) {
        next[cartId] = newQty;
      } else {
        delete next[cartId];
      }
      saveToStorage("reshto-cart", next);
      return next;
    });
  };

  const removeFromCart = (cartId) => {
    setQuantities((current) => {
      const next = { ...current };
      delete next[cartId];
      saveToStorage("reshto-cart", next);
      return next;
    });
  };

  const clearCart = () => {
    setQuantities({});
    saveToStorage("reshto-cart", {});
  };

  // Cart Drawer open/close
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Calculated Cart Items & Totals
  const cartItems = useMemo(() => {
    return menuItems
      .filter((item) => quantities[item.cartId] > 0)
      .map((item) => ({
        ...item,
        quantity: quantities[item.cartId],
        itemTotal:
          Number(item.menuItemPrice.replace("$", "")) * quantities[item.cartId],
      }));
  }, [menuItems, quantities]);

  const cartCount = useMemo(() => {
    return Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
  }, [quantities]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  }, [cartItems]);

  // Discount calculation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon || cartSubtotal <= 0) return 0;
    if (appliedCoupon.discountPercent) {
      return (cartSubtotal * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.flatDiscount) {
      return Math.min(cartSubtotal, appliedCoupon.flatDiscount);
    }
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  // Delivery fee: $5 standard, free if order >= $50 or FREESHIP coupon
  const deliveryFee = useMemo(() => {
    if (cartSubtotal <= 0) return 0;
    if (appliedCoupon?.freeShipping || cartSubtotal >= 50) return 0;
    return 5.0;
  }, [appliedCoupon, cartSubtotal]);

  // Estimated tax (5%)
  const taxAmount = useMemo(() => {
    if (cartSubtotal <= 0) return 0;
    const taxableAmount = Math.max(0, cartSubtotal - couponDiscount);
    return taxableAmount * 0.05;
  }, [cartSubtotal, couponDiscount]);

  // Final total
  const cartTotal = useMemo(() => {
    if (cartSubtotal <= 0) return 0;
    return Math.max(0, cartSubtotal - couponDiscount + deliveryFee + taxAmount);
  }, [cartSubtotal, couponDiscount, deliveryFee, taxAmount]);

  // Coupon handling
  const applyCoupon = (rawCode) => {
    const code = (rawCode || "").trim().toUpperCase();
    if (!code) {
      return { success: false, message: "Please enter a valid coupon code." };
    }
    if (cartSubtotal <= 0) {
      return { success: false, message: "Add items to your cart before applying a coupon." };
    }
    if (code === "SAVE20") {
      setAppliedCoupon({ code, discountPercent: 20, desc: "20% off whole food order" });
      return { success: true, message: "🎉 Code 'SAVE20' applied! 20% discount added to your bill." };
    }
    if (code === "FREESHIP") {
      setAppliedCoupon({ code, freeShipping: true, desc: "Free Home Delivery ($5 Saved)" });
      return { success: true, message: "🎉 Code 'FREESHIP' applied! Delivery is 100% free." };
    }
    if (code === "RESHTO10") {
      if (cartSubtotal < 40) {
        return { success: false, message: "Code 'RESHTO10' requires minimum order of $40.00." };
      }
      setAppliedCoupon({ code, flatDiscount: 10, desc: "$10.00 Flat Discount" });
      return { success: true, message: "🎉 Code 'RESHTO10' applied! $10.00 saved on your order." };
    }
    if (code === "WELCOME15") {
      setAppliedCoupon({ code, discountPercent: 15, desc: "15% Welcome Discount" });
      return { success: true, message: "🎉 Code 'WELCOME15' applied! 15% discount activated." };
    }
    return {
      success: false,
      message: "Invalid coupon. Try available codes: SAVE20, FREESHIP, or RESHTO10.",
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // --- ORDER OPERATIONS ---
  const placeOrder = (orderData) => {
    const subtotalNum = orderData.subtotalNumber ?? cartSubtotal;
    const discountNum = orderData.discountNumber ?? couponDiscount;
    const deliveryNum = orderData.deliveryNumber ?? deliveryFee;
    const taxNum = orderData.taxNumber ?? taxAmount;
    const totalNum = orderData.totalNumber ?? cartTotal;
    const paymentMethod = orderData.paymentMethod || "Cash on Delivery";

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: orderData.customer || "Guest Customer",
      email: orderData.email || "guest@example.com",
      phone: orderData.phone || "+1 555-0192",
      address: orderData.address || "Dine-in / Pickup",
      orderType: orderData.orderType || orderData.type || "Delivery",
      paymentMethod,
      paymentStatus:
        orderData.paymentStatus ||
        (paymentMethod === "Cash on Delivery"
          ? "Pending (COD)"
          : "Pending (Manual Verification)"),
      notes: orderData.notes || "",
      coupon: orderData.coupon || appliedCoupon?.code || null,
      subtotalNumber: subtotalNum,
      discountNumber: discountNum,
      deliveryNumber: deliveryNum,
      taxNumber: taxNum,
      totalNumber: totalNum,
      subtotal: `$${subtotalNum.toFixed(2)}`,
      discount: discountNum > 0 ? `-$${discountNum.toFixed(2)}` : "$0.00",
      deliveryFee: `$${deliveryNum.toFixed(2)}`,
      tax: `$${taxNum.toFixed(2)}`,
      total: `$${totalNum.toFixed(2)}`,
      items:
        orderData.items ||
        cartItems.map((i) => ({
          id: i.id,
          name: i.menuItemName,
          qty: i.quantity,
          price: i.menuItemPrice,
          image: i.image,
          category: i.categoryLabel,
          lineTotal: `$${i.itemTotal.toFixed(2)}`,
        })),
      itemsSummary:
        orderData.itemsSummary ||
        cartItems.map((i) => `${i.menuItemName} x${i.quantity}`).join(", "),
      status: "Preparing",
      type: orderData.type || orderData.orderType || "Delivery",
      date: "Just now",
      createdAt: Date.now(),
    };

    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    saveToStorage("reshto-orders", nextOrders);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const nextOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(nextOrders);
    saveToStorage("reshto-orders", nextOrders);
  };

  // --- RESERVATION OPERATIONS ---
  const addReservation = (resData) => {
    const zoneName = resData.seatingZone || "Indoor Grand Dining";
    const tableNumber = resData.tableNumber || Math.floor(Math.random() * 12) + 1;
    const assignedTable = resData.table || `Table ${tableNumber} (${zoneName})`;

    const newRes = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      guestName: resData.guestName || "Guest",
      email: resData.email || "",
      phone: resData.phone || "",
      guests: Number(resData.guests) || 2,
      date: resData.date || "Today",
      time: resData.time || "19:00",
      seatingZone: zoneName,
      occasion: resData.occasion || "Casual Dining",
      addOns: Array.isArray(resData.addOns) ? resData.addOns : [],
      decorationNotes: resData.decorationNotes || resData.notes || "",
      table: assignedTable,
      status: resData.status || "Confirmed",
      createdAt: Date.now(),
    };

    const nextRes = [newRes, ...reservations];
    setReservations(nextRes);
    saveToStorage("reshto-reservations", nextRes);
    return newRes;
  };

  const updateReservationStatus = (resId, newStatus) => {
    const nextRes = reservations.map((r) =>
      r.id === resId ? { ...r, status: newStatus } : r
    );
    setReservations(nextRes);
    saveToStorage("reshto-reservations", nextRes);
  };

  // --- MENU MANAGEMENT (ADMIN CRUD) ---
  const addMenuItem = (item) => {
    const formattedPrice = item.price.startsWith("$") ? item.price : `$${item.price}`;
    const newItem = {
      id: Date.now(),
      menuItemName: item.name,
      menuItemPrice: formattedPrice,
      menuItemDesc: item.desc || "Prepared fresh in our kitchen with love.",
      category: item.category || "lunch",
      categoryLabel:
        menuTabs.find((t) => t.key === item.category)?.label || "Menu",
      cartId: `${item.category || "lunch"}-${Date.now()}`,
      image:
        item.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      inStock: true,
    };

    const nextMenu = [newItem, ...menuItems];
    setMenuItems(nextMenu);
    saveToStorage("reshto-menu", nextMenu);
    return newItem;
  };

  const deleteMenuItem = (itemId) => {
    const nextMenu = menuItems.filter((i) => i.id !== itemId && i.cartId !== itemId);
    setMenuItems(nextMenu);
    saveToStorage("reshto-menu", nextMenu);
  };

  const toggleMenuItemStock = (itemId) => {
    const nextMenu = menuItems.map((i) =>
      i.id === itemId || i.cartId === itemId ? { ...i, inStock: !i.inStock } : i
    );
    setMenuItems(nextMenu);
    saveToStorage("reshto-menu", nextMenu);
  };

  // --- FAVORITES OPERATIONS ---
  const toggleFavorite = (dishId) => {
    setFavorites((current) => {
      const next = current.includes(dishId)
        ? current.filter((id) => id !== dishId)
        : [...current, dishId];
      saveToStorage("reshto-favorites", next);
      return next;
    });
  };

  const isFavorite = (dishId) => favorites.includes(dishId);

  // --- REVIEWS OPERATIONS ---
  const addReview = (reviewData) => {
    const newRev = {
      id: `REV-${Math.floor(100 + Math.random() * 900)}`,
      dishId: reviewData.dishId,
      dishName: reviewData.dishName || "Selected Dish",
      customerName: reviewData.customerName || "Foodie Guest",
      rating: Number(reviewData.rating) || 5,
      comment: reviewData.comment || "Delicious meal, loved the presentation and fresh ingredients!",
      date: "Just now",
      createdAt: Date.now(),
    };
    const nextReviews = [newRev, ...reviews];
    setReviews(nextReviews);
    saveToStorage("reshto-reviews", nextReviews);
    return newRev;
  };

  return (
    <StoreContext.Provider
      value={{
        hydrated,
        menuItems,
        quantities,
        cartItems,
        cartCount,
        cartSubtotal,
        couponDiscount,
        deliveryFee,
        taxAmount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        toggleCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        updateOrderStatus,
        reservations,
        addReservation,
        updateReservationStatus,
        addMenuItem,
        deleteMenuItem,
        toggleMenuItemStock,
        favorites,
        toggleFavorite,
        isFavorite,
        reviews,
        addReview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export default StoreProvider;
