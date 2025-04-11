
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const stopLossPresets = {
  BTC: 1,
  ETH: 2,
  ALT: 3,
  MEME: 5,
};

export default function LeverageCalculator() {
  const [capital, setCapital] = useState(1000);
  const [riskPercent, setRiskPercent] = useState(10);
  const [stopLossPercent, setStopLossPercent] = useState(1);
  const [coinType, setCoinType] = useState("BTC");
  const [result, setResult] = useState(null);

  const calculateLeverage = () => {
    const maxLoss = (capital * riskPercent) / 100;
    const positionSize = maxLoss / (stopLossPercent / 100);
    const leverage = positionSize / capital;
    setResult({ maxLoss, positionSize, leverage });
  };

  const handleCoinSelect = (value) => {
    setCoinType(value);
    setStopLossPercent(stopLossPresets[value]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <Card className="p-4 shadow-xl">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">杠杆倍数计算器</h2>

          <div className="space-y-2">
            <Label>币种类型（预设止损）</Label>
            <Select value={coinType} onValueChange={handleCoinSelect}>
              <SelectTrigger>
                <SelectValue placeholder="选择币种" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">BTC（1%止损）</SelectItem>
                <SelectItem value="ETH">ETH（2%止损）</SelectItem>
                <SelectItem value="ALT">小币种（3%止损）</SelectItem>
                <SelectItem value="MEME">MEME币（5%止损）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>本金（$）</Label>
            <Input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>单笔最大亏损比例（%）</Label>
            <Input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>止损点（%）</Label>
            <Input
              type="number"
              value={stopLossPercent}
              onChange={(e) => setStopLossPercent(Number(e.target.value))}
            />
          </div>

          <Button className="w-full" onClick={calculateLeverage}>
            计算杠杆倍数
          </Button>

          {result && (
            <div className="pt-4 space-y-2">
              <p>📉 最大可承受亏损：${result.maxLoss.toFixed(2)}</p>
              <p>📈 建议最大开仓价值：${result.positionSize.toFixed(2)}</p>
              <p>⚖️ 推荐杠杆倍数：{result.leverage.toFixed(2)}x</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
