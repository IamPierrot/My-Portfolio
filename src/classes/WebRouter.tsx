import React, { Suspense } from "react";
import { Layout } from "../types/Layout";
import { Route } from "react-router";
import { Loading } from "../components";

export default class WebRouter {
  private static webRouters: WebRouter[] = [];
  private constructor(
    private path: string,
    private content: React.FC,
    private Layout: Layout,
  ) {}

  public static createWebRouter(
    path: string,
    content: React.FC,
    Layout: Layout,
  ) {
    this.webRouters.push(new WebRouter(path, content, Layout));
  }

  public static getRouters(): ({ path: string; name: string } | undefined)[] {
    return this.webRouters.map((r) => {
      if (r.path.includes("/"))
        return {
          path: r.path,
          name: r.path.split("/").pop()!,
        };
    });
  }

  private render() {
    const ContentComponent = this.content;
    const LayoutComponent = this.Layout;

    return (
      <Route
        path={this.path}
        key={this.path}
        element={
          <Suspense fallback={<Loading />}>
            <LayoutComponent>
              <ContentComponent />
            </LayoutComponent>
          </Suspense>
        }
      />
    );
  }

  public static renderAllWebRouters() {
    return this.webRouters.map((r) => r.render());
  }
}
