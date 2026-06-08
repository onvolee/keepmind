import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";

export function EventProPagation() {
  const [msg, setMsg] = useState<string[]>([]);

  useLayoutEffect(() => {
    const btn = document.querySelector("#btn");
    const innerDom = document.querySelector("#inner");

    function registerEvent(
      dom: Element,
      callback: (e: Event) => void,
      options?: boolean | AddEventListenerOptions,
    ) {
      if (!dom) throw Error("need dom");
      dom.addEventListener("click", callback, options);
    }

    if (btn) {
      registerEvent(
        btn,
        (e) => {
          console.log(e);
          setMsg((m) => {
            return [...m, "btn capture"];
          });
        },
        {
          capture: true,
        },
      );

      registerEvent(btn, (e) => {
        e.stopPropagation();
        setMsg((m) => {
          return [...m, "btn bubble"];
        });
      });
    }
    if (innerDom) {
      registerEvent(
        innerDom,
        (e) => {
          setMsg((m) => {
            return [...m, "inner capture"];
          });
        },
        {
          capture: true,
        },
      );
      registerEvent(innerDom, (e) => {
        setMsg((m) => {
          return [...m, "inner bubble"];
        });
      });
    }
  }, []);

  return (
    <section>
      <section className="flex gap-2">
        <div className="w-50 h-50 bg-blue-400 p-10 relative">
          <span className="top-0 left-0 absolute" id="outer">
            outer
          </span>
          <div
            className="w-full h-full bg-amber-400 relative flex items-center justify-center cursor-pointer"
            id="inner"
          >
            <span className="top-0 left-0 absolute">inner(click me)</span>
            <Button id="btn" variant={"secondary"}>
              click me
            </Button>
          </div>
        </div>
        <Button onClick={() => setMsg([])}>reset output log</Button>
      </section>
      <section>
        {msg.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </section>
    </section>
  );
}
