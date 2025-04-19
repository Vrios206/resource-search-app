// components/ui/button.js
export function Button({ children, asChild = false, variant = "default" }) {
    const base =
      "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    };
  
    const className = `${base} ${variants[variant]}`;
  
    if (asChild && typeof children === "object") {
      return children.type === "a"
        ? (
            <a {...children.props} className={className}>
              {children.props.children}
            </a>
          )
        : (
            <span className={className}>{children}</span>
          );
    }
  
    return <button className={className}>{children}</button>;
  }
  