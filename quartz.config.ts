import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Tennety Art News",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "news.tennety.art",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Oldenburg",
        body: "Varela Round",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#D4B5A0",
          gray: "#8B7355",
          darkgray: "#5C4535",
          dark: "#2A1A10",
          secondary: "#8B3A2A",
          tertiary: "#2D8B6F",
          highlight: "rgba(245, 214, 198, 0.15)",
          textHighlight: "#F5D6C688",
        },
        darkMode: {
          light: "#1A1210",
          lightgray: "#4A3830",
          gray: "#A89480",
          darkgray: "#C4A898",
          dark: "#E8D5C4",
          secondary: "#D4785A",
          tertiary: "#4DB895",
          highlight: "rgba(61, 42, 34, 0.5)",
          textHighlight: "#D4785A44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: (a, b) => {
          const dateA = a.dates?.modified ?? a.dates?.created ?? a.dates?.published
          const dateB = b.dates?.modified ?? b.dates?.created ?? b.dates?.published
          if (dateA && dateB) return dateB.getTime() - dateA.getTime()
          if (dateA) return -1
          if (dateB) return 1
          return (a.frontmatter?.title ?? "").localeCompare(b.frontmatter?.title ?? "")
        },
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
