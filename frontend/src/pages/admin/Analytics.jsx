import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function Analytics() {
  const metrics = [
    { label: 'การเติบโตของรายได้', value: '+25.3%', trend: 'up', color: 'text-green-400' },
    { label: 'การเติบโตของคำสั่งซื้อ', value: '+18.2%', trend: 'up', color: 'text-green-400' },
    { label: 'อัตราการกลับมาซื้อซ้ำ', value: '87.5%', trend: 'up', color: 'text-green-400' },
    { label: 'มูลค่าเฉลี่ยต่อออเดอร์', value: '-2.1%', trend: 'down', color: 'text-red-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">วิเคราะห์ข้อมูล</h1>
        <p className="text-gray-600 text-lg">ข้อมูลเชิงลึกและตัวชี้วัดประสิทธิภาพธุรกิจ</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                {metric.trend === 'up' ? (
                  <TrendingUp className={metric.color} />
                ) : (
                  <TrendingDown className={metric.color} />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มการขาย</CardTitle>
            <CardDescription>ยอดขายตามช่วงเวลา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">กราฟ - ยอดขายตามช่วงเวลา</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>รายได้แยกตามสินค้า</CardTitle>
            <CardDescription>รายได้แยกตามสินค้า</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">กราฟ - รายได้แยกตามสินค้า</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลประชากรลูกค้า</CardTitle>
            <CardDescription>อายุและที่อยู่ของลูกค้า</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">กราฟ - อายุ/ที่อยู่ของลูกค้า</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>แหล่งที่มาของผู้เยี่ยมชม</CardTitle>
            <CardDescription>ช่องทางการเข้าถึง</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">กราฟ - ช่องทางการเข้าถึง</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
