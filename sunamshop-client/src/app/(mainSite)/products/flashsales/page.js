import FlashSalesPage from "@/components/common/FlashSale/FlashSalesPage";
import { getAllFalseSales } from "@/utils/FlashSalesApi";

const FlashSales = async () => {
  const flashSales = await getAllFalseSales();

  return (
    <FlashSalesPage
      flashProducts={flashSales?.products || []}
      endDate={flashSales?.campaign?.endDate}
    />
  );
};

export default FlashSales;