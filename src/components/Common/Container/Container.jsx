import React from "react";

import "./Container.less";

export default function Container({ children, className = "" }) {
  return <div className={`container ${className}`}>{children}</div>;
}
