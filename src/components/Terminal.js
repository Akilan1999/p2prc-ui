import React, { useState, useEffect, useRef } from "react";

function Runtime() {
  return (
    <li className="runtime">
      <span className="name">p2prc</span>
      <span>&ensp;is&ensp;</span>
      <span className="emoji">📦&ensp;</span>
      <span className="version">v1.0.0</span>
    </li>
  );
}

function generateLog(log) {
  return log.map((l, i) => {
    return (
      <span key={i}>
        <li className="seperator"></li>
        <li>{l.output}</li>
        <li>
          <span className="home-indicator">{"➜"}</span>
          <span>{l.input}</span>
        </li>
        <Runtime />
        <li className="seperator"></li>
      </span>
    );
  });
}

export function Terminal() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([]);

  const inputRef = useRef(null);

  function onInputChange(e) {
    setInput(e.target.value);
  }

  async function onKeyDown(e) {
    if (e.key === "Enter") {
      if (input === "clear") {
        setLog([]);
      } else {
        try {
          const response = await fetch("http://localhost:8000/", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              CMD: input,
            }),
          });

          const { Stdout, Stderr } = await response.json();

          const _log = [{ output: Stdout || Stderr, input }, ...log];
          setLog(_log);
        } catch (error) {
          console.error(error);
        }
      }

      e.target.value = "";
      setInput("");
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      //   inputRef.current.scrollIntoView({ behavior: "smooth" });
      var page = document.querySelector("body");
      var scrollable = document.querySelector("main.terminal ul");
      var scrolled = document.querySelector(".cursor input");
      page.scrollTop = scrollable.offsetTop - page.offsetTop;
      scrollable.scrollTop = scrolled.offsetTop - scrollable.offsetTop;
    }
  }, [inputRef, log]);

  return (
    <div className="terminal-container">
      <main className="terminal">
        <div className="shadow" />

        <div className="titlebar">p2prc</div>
        <ul>
          <li className="seperator"></li>
          <li className="seperator"></li>
          <li className="cursor">
            <span className="home-indicator">{"➜"}</span>
            <input
              type="text" //
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              ref={inputRef}
            />
            <i />
          </li>
          <Runtime />

          {generateLog(log)}
        </ul>
      </main>
    </div>
  );
}
