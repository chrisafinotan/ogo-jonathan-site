import { Children, cloneElement } from "react";
import { withRouter } from "next/router";
import Link from "next/link";

const CLink = withRouter(
    ({ activeClassName = "activeLink", children, router, ...props }) => {
        const child = Children.only(children);

        let className = child.props.className || "";
        const linkPathname =
            typeof props.href === "string"
                ? props.href
                : props.href.pathname || null;

        if (router.pathname === linkPathname) {
            className += ` ${activeClassName}`;
        } else if (
            linkPathname !== "/" &&
            String(router.pathname).includes(linkPathname)
        ) {
            className += ` ${activeClassName}`;
        }

        return <Link {...props}>{cloneElement(child, { className })}</Link>;
    }
);

export default CLink;
