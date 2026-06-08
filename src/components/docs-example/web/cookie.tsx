import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const tableData = [
  {
    propertyName: "HttpOnly",
    description: "禁止 JS 通过 document.cookie 读取",
  },
  {
    propertyName: "Secure",
    description: "只在 HTTPS 下发送，localhost 例外",
  },
  {
    propertyName: "SameSite=Strict",
    description: "只在同站请求中发送",
  },
  {
    propertyName: "SameSite=Lax",
    description: "同站请求发送，部分顶层跨站导航也发送",
  },
  {
    propertyName: "SameSite=None",
    description: "允许跨站发送",
  },
  {
    propertyName: "Domain",
    description: "控制哪些 host 可收到 Cookie",
  },
  {
    propertyName: "Path",
    description: "控制路径匹配",
  },
  {
    propertyName: "Max-Age / Expires",
    description: "生命周期",
  },
  {
    propertyName: "Partitioned",
    description: "CHIPS 分区 Cookie",
  },
];

export function CookieProperty() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>属性名</TableHead>
          <TableHead>描述</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => {
          return (
            <>
              <TableRow>
                <TableCell>
                  <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    {data.propertyName}
                  </Badge>
                </TableCell>
                <TableCell>{data.description}</TableCell>
              </TableRow>
            </>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function FrontEndPromiseField() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>函数名</TableHead>
          <TableHead>字段</TableHead>
          <TableHead>默认值</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              fetch
            </Badge>
          </TableCell>
          <TableCell>credentials</TableCell>
          <TableCell>'same-origin'</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              XMLHttpRequest
            </Badge>
          </TableCell>
          <TableCell>withCredentials</TableCell>
          <TableCell>false</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              axios
            </Badge>
          </TableCell>
          <TableCell>withCredentials</TableCell>
          <TableCell>false</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
