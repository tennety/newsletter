import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// @ts-ignore
import script from "./scripts/latestPostRedirect.inline"

const LatestPostRedirect: QuartzComponent = (_props: QuartzComponentProps) => {
  return <></>
}

LatestPostRedirect.afterDOMLoaded = script

export default (() => LatestPostRedirect) satisfies QuartzComponentConstructor
