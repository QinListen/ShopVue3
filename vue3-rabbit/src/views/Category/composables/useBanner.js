// 轮播图业务代码
import { onMounted, ref } from "vue";
import { getBannerAPI } from "@/apis/home";

// 导出业务函数
export function useBanner() {
  const bannerList = ref([]);
  const getbanner = async () => {
    const res = await getBannerAPI({ distributionSite: "2" });
    bannerList.value = res.result;
  };
  onMounted(() => {
    getbanner();
  });
  return {
    bannerList,
  };
}


