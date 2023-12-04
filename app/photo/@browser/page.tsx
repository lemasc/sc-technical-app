function DayBrowser() {
  return (
    <div>
      <div className="font-semibold text-sm pl-12 py-3 rounded-r-lg bg-slate-200">
        December 4
      </div>
      <ul className="pl-16 py-3 space-y-6 text-sm">
        <li>พิธีเปิด/พิธีปิด</li>
        <li>ฟุตบอล</li>
        <li>พิธีเปิด/พิธีปิด</li>
        <li>ฟุตบอล</li>
        <li>พิธีเปิด/พิธีปิด</li>
        <li>ฟุตบอล</li>
        <li>พิธีเปิด/พิธีปิด</li>
        <li>ฟุตบอล</li>
      </ul>
    </div>
  );
}

function PhotoBrowser() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium pl-8 text-muted-foreground">
        On Cloud
      </span>
      <DayBrowser />
      <DayBrowser />
      <DayBrowser />
      <DayBrowser />
      <DayBrowser />
    </div>
  );
}

export default function Browser() {
  return (
    <div className="space-y-4 h-[91vh] py-4 pr-8 overflow-y-auto">
      <PhotoBrowser />
      <PhotoBrowser />
    </div>
  );
}
