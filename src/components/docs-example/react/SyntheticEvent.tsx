import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type StopMode = "none" | "synthetic" | "native";

const stopModeLabel: Record<StopMode, string> = {
  none: "不阻止冒泡",
  synthetic: "在合成事件中阻止",
  native: "在原生事件中阻止",
};

export function SyntheticEvent({
  stopPropagation = false,
}: {
  stopPropagation?: boolean;
}) {
  const [parentCount, setParentCount] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);

  return (
    <div
      className="flex items-center gap-3 rounded-lg border p-3"
      onClick={() => {
        setParentCount((c) => c + 1);
      }}
    >
      <span>parent: {parentCount}</span>
      <span>button: {buttonCount}</span>
      <Button
        variant={"secondary"}
        type="button"
        onClick={(e) => {
          if (stopPropagation) {
            e.stopPropagation();
          }
          setButtonCount((c) => c + 1);
        }}
      >
        plus btn
      </Button>
    </div>
  );
}

export function NativeSyntheticPropagationDemo() {
  const [stopMode, setStopMode] = useState<StopMode>("none");
  const [logs, setLogs] = useState<string[]>([]);
  const nativeParentRef = useRef<HTMLDivElement>(null);
  const stopModeRef = useRef(stopMode);

  stopModeRef.current = stopMode;

  useEffect(() => {
    const parent = nativeParentRef.current;
    if (!parent) return;

    const handleNativeParentClick = (event: MouseEvent) => {
      pushLog("1. 原生父级冒泡事件");

      if (stopModeRef.current === "native") {
        event.stopPropagation();
        pushLog("2. 原生父级调用 event.stopPropagation()");
      }
    };

    parent.addEventListener("click", handleNativeParentClick);

    return () => {
      parent.removeEventListener("click", handleNativeParentClick);
    };
  }, []);

  function pushLog(message: string) {
    setLogs((current) => [...current, message]);
  }

  function resetLogs() {
    setLogs([]);
  }

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="flex flex-wrap gap-2">
        {(["none", "synthetic", "native"] as const).map((mode) => (
          <Button
            key={mode}
            type="button"
            variant={mode === stopMode ? "default" : "secondary"}
            onClick={() => {
              setStopMode(mode);
              setLogs([]);
            }}
          >
            {stopModeLabel[mode]}
          </Button>
        ))}
      </div>

      <div
        ref={nativeParentRef}
        className="rounded-md border border-dashed p-3"
        onClick={() => {
          pushLog("4. React 合成父级冒泡事件");
        }}
      >
        <Button
          type="button"
          variant="secondary"
          onClick={(event) => {
            pushLog("3. React 合成按钮事件");

            if (stopMode === "synthetic") {
              event.stopPropagation();
              pushLog("4. React 合成按钮调用 event.stopPropagation()");
            }
          }}
        >
          点击测试
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">执行顺序</p>
          <Button type="button" variant="secondary" onClick={resetLogs}>
            清空
          </Button>
        </div>

        <ol className="space-y-1 rounded-md bg-muted p-3 text-sm">
          {logs.length > 0 ? (
            logs.map((log, index) => <li key={`${index}-${log}`}>{log}</li>)
          ) : (
            <li className="text-muted-foreground">点击按钮查看事件执行顺序</li>
          )}
        </ol>
      </div>
    </div>
  );
}
