'use client';
import "@/app/globals.css"
let isDisplayJs = false;
import { useState } from "react";

const jsDisplaycontent = <><strong>已</strong>展示JS条件渲染</>
const noJsDisplaycontent = <><strong>未</strong>展示JS条件渲染</>

function ToggleJs({ displayJs }: { displayJs: boolean }) {
    return (
        <div>
            <strong>{displayJs ? "已" : "未"}</strong>展示JS条件渲染
        </div>
    );
}

export default function HelloWorld() {
    const [isDisplayJs, setDisplayJs] = useState(false);

    return (
        <main>
            <div className="">Hello World</div>
            以下是React基础
            <br/>
            <button className="h-[40] p-[12] bg-[grey] cursor-pointer" onClick={() => setDisplayJs(!isDisplayJs)}>点我切换不同展示</button>
            
            <ToggleJs displayJs={isDisplayJs}/>
            {isDisplayJs ? jsDisplaycontent : noJsDisplaycontent}
            {isDisplayJs && jsDisplaycontent}
        </main>
    )
}