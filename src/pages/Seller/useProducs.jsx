import { useQuery } from "@tanstack/react-query";

export const useProducts = (user) => {
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/products?email=${user?.email}`
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  return { products, refetch };
};