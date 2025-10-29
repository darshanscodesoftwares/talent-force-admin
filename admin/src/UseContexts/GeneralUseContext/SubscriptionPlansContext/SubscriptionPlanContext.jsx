import React, { createContext, useContext, useEffect, useState } from "react";

const SubscriptionPlanContext = createContext();

export const SubscriptionPlanProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("http://192.168.29.163:8000/api/admin-subscription-information");
      const data = await response.json();

      if (data.status === "Success" && Array.isArray(data.data)) {
        // Sort by order: Free → Basic → Premium → (others alphabetically)
        const order = ["Free", "Basic", "Premium"];
        const sorted = [...data.data].sort((a, b) => {
          const aIndex = order.indexOf(a.name);
          const bIndex = order.indexOf(b.name);
          // If both found in order array → sort by order
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          // If one found, push unknowns to bottom
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          // Otherwise alphabetical
          return a.name.localeCompare(b.name);
        });

        setSubscriptions(sorted);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <SubscriptionPlanContext.Provider value={{ subscriptions, loading, error }}>
      {children}
    </SubscriptionPlanContext.Provider>
  );
};

export const useSubscriptionPlans = () => useContext(SubscriptionPlanContext);
export default SubscriptionPlanProvider;
