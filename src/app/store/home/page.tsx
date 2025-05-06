// app/store/explore/page.tsx
import { Suspense } from "react";
import type { Store } from "@/app/types/store";
import StoreHome from "../../../components/StoreHome";

async function fetchStores(): Promise<Store[]> {
  const res = await fetch("http://localhost:4000/stores", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch store data");
  return res.json();
}

const ExplorePage = async () => {
  const stores = await fetchStores();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreHome stores={stores} />
    </Suspense>
  );
};

export default ExplorePage;