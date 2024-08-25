import React from "react";
import { Layout } from "../types/Layout";
import { Route } from "react-router";

export default class WebRouter {
  private static webRouters: WebRouter[] = [];
  private constructor(
    private path: string,
    private content: React.FC,
    private Layout: Layout,
  ) {}

  public static createWebRouter(path: string, content: React.FC, Layout: Layout) {
    this.webRouters.push(new WebRouter(path, content, Layout));
  }

  public render() {
    const ContentComponent = this.content;
    const LayoutComponent = this.Layout;

    return (
      <Route
        path={this.path}
        element={
          <LayoutComponent>
            <ContentComponent />
          </LayoutComponent>
        }
      />
    );
  }

  public static renderAllWebRouters() {
    return this.webRouters.map(r => r.render());
  }
}
