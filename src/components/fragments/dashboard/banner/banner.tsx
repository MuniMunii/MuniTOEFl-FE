import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TopBanner() {
  return (
    <Card className="bg-[#FFF8EE] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
      <CardContent className="flex justify-between items-center p-6 relative">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-gray-900">Coconut</h2>
          <div className="flex gap-2 items-center">
            <Badge className="bg-green-600 hover:bg-green-700 text-white">
              Free Test
            </Badge>
            <div className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
              <span>graded in 1 min</span>
            </div>
          </div>
        </div>
{/* 
        <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px]">
          <img
            src="/assets/images/banner/coconut-banner.png"
            alt="Coconut Illustration"
            className="object-contain w-full h-full"
          />
        </div> */}
      </CardContent>
    </Card>
  );
}