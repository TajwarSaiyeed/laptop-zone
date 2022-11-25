import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users`);
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return { users, refetch };
}
