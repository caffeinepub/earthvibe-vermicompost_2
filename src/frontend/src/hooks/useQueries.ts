import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      productId,
    }: { name: string; phone: string; productId: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(name, phone, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
