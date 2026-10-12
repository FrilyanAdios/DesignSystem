import { Accessibility, Braces, Layers, ListChecks, Moon, TabletSmartphone, Type } from "lucide-react";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { Checks, Code, MOBILE_TYPE, PLATFORM_REFS, Refs, T, Table } from "./dev-kit";

/* ---------------------------------------------------------------------------
   iOS native guide — SwiftUI first, UIKit where needed, Apple HIG for
   behavior. Values mirror the mobile tokens (FSM-Mobile/css) so an iPhone
   build reads the same as the Flutter build.
   --------------------------------------------------------------------------- */

function Setup() {
  return (
    <div className="prose">
      <Rule icon={TabletSmartphone}>
        The HIG decides <strong className="hl">navigation, gestures, and system controls</strong>. Esco tokens decide
        color, type, spacing, and status.
      </Rule>
      <p>
        Build screens in SwiftUI. Drop to UIKit only for what SwiftUI can’t do yet, such as a PDF view or a signature
        canvas, and wrap it in a <T>UIViewRepresentable</T> so screens stay SwiftUI.
      </p>
      <Code title="Project layout" lang="text">{`
EscoFSM/
  Design/
    EscoTokens.swift       spacing, radius, size, motion
    EscoFont.swift         Noto Sans with Dynamic Type
    EscoStatus.swift       the five status families
    Colors.xcassets        every color, with Dark and High Contrast variants
  Components/              EscoStatusPill, EscoField, RecordAction …
  Features/Schedule/       screens compose components; no restyled copies
  Fonts/                   NotoSans-Regular/Medium/SemiBold.ttf
`}</Code>
      <p>
        Add the three font files to the target and list them under <T>UIAppFonts</T> (“Fonts provided by application”) in{" "}
        <T>Info.plist</T>. Check each file’s PostScript name in Font Book; that is the name SwiftUI expects.
      </p>
    </div>
  );
}

function Tokens() {
  return (
    <div className="prose">
      <Rule icon={Braces}>
        Colors live in the <strong className="hl">asset catalog</strong>, so dark mode and Increase Contrast work without
        code. Everything else is a Swift constant.
      </Rule>
      <Table
        head={["Color set", "Any appearance", "Dark"]}
        rows={[
          [<T>EscoPrimary</T>, "#00467F", "#8FBDEC"],
          [<T>EscoOnPrimary</T>, "#FFFFFF", "#08121B"],
          [<T>EscoPrimaryContainer</T>, "#EAF1F7", "#1E2A38"],
          [<T>EscoBackground</T>, "#F6F8FA", "#0F151C"],
          [<T>EscoSurface</T>, "#FFFFFF", "#182028"],
          [<T>EscoText</T>, "#243342", "#E8EEF4"],
          [<T>EscoTextSecondary</T>, "#596B7C", "#B6C3CF"],
          [<T>EscoOutline</T>, "#D8E1EA", "#2E3945"],
          [<T>EscoInputBorder</T>, "#7D8F9F", "#5D6D7D"],
          [<T>EscoError</T>, "#C2362F", "#FF9D95"],
        ]}
      />
      <Code title="Design/EscoTokens.swift" lang="swift">{`
import SwiftUI

extension Color {
    static let escoPrimary = Color("EscoPrimary")
    static let escoOnPrimary = Color("EscoOnPrimary")
    static let escoPrimaryContainer = Color("EscoPrimaryContainer")
    static let escoBackground = Color("EscoBackground")
    static let escoSurface = Color("EscoSurface")
    static let escoText = Color("EscoText")
    static let escoTextSecondary = Color("EscoTextSecondary")
    static let escoOutline = Color("EscoOutline")
    static let escoInputBorder = Color("EscoInputBorder")
    static let escoError = Color("EscoError")
}

enum EscoSpace {
    static let s4: CGFloat = 4, s8: CGFloat = 8, s12: CGFloat = 12
    static let s16: CGFloat = 16, s24: CGFloat = 24, s32: CGFloat = 32
}

enum EscoSize {
    static let touch: CGFloat = 48   // HIG minimum is 44 pt; Esco uses 48
    static let field: CGFloat = 52
    static let icon: CGFloat = 20
}

enum EscoRadius {
    static let small: CGFloat = 8, control: CGFloat = 12, card: CGFloat = 16, sheet: CGFloat = 28
}

enum EscoMotion {
    static let state = Animation.easeInOut(duration: 0.18)
    static let sheet = Animation.timingCurve(0.22, 1, 0.36, 1, duration: 0.32)
}
`}</Code>
    </div>
  );
}

function Typography() {
  return (
    <div className="prose">
      <Rule icon={Type}>
        Noto Sans, but <strong className="hl">scaled like a system font</strong>. Every size is tied to a text style so
        Dynamic Type works.
      </Rule>
      <Code title="Design/EscoFont.swift" lang="swift">{`
import SwiftUI

extension Font {
    static let escoToday   = Font.custom("NotoSans-SemiBold", size: 26, relativeTo: .title)
    static let escoTitle   = Font.custom("NotoSans-SemiBold", size: 22, relativeTo: .title2)
    static let escoSection = Font.custom("NotoSans-SemiBold", size: 17, relativeTo: .headline)
    static let escoBody    = Font.custom("NotoSans-Regular",  size: 16, relativeTo: .callout)
    static let escoMeta    = Font.custom("NotoSans-Regular",  size: 14, relativeTo: .subheadline)
    static let escoCaption = Font.custom("NotoSans-Medium",   size: 13, relativeTo: .footnote)
}

// UIKit, for wrapped views
let body = UIFontMetrics(forTextStyle: .callout)
    .scaledFont(for: UIFont(name: "NotoSans-Regular", size: 16)!)
// label.font = body; label.adjustsFontForContentSizeCategory = true
`}</Code>
      <Table
        head={["Role", "Size", "Weight", "Relative to"]}
        rows={MOBILE_TYPE.map((t) => [t.role, t.size, t.weight, <T>{t.ios}</T>])}
      />
      <p>
        Spacing that sits next to text can scale with it too: <T>@ScaledMetric(relativeTo: .body) var gap = 8</T>. At
        accessibility sizes, switch side-by-side rows to stacked with <T>ViewThatFits</T> or by checking{" "}
        <T>dynamicTypeSize.isAccessibilitySize</T>.
      </p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="prose">
      <p>
        A <T>TabView</T> with the same four destinations as Android, each tab owning its own <T>NavigationStack</T>.
      </p>
      <Code title="AppShell.swift" lang="swift">{`
TabView {
    NavigationStack { TodayView() }
        .tabItem { Label("Today", systemImage: "calendar") }
    NavigationStack { ModulesView() }
        .tabItem { Label("Modules", systemImage: "square.grid.2x2") }
    NavigationStack { NotificationsView() }
        .tabItem { Label("Notifications", systemImage: "bell") }
    NavigationStack { ProfileView() }
        .tabItem { Label("Profile", systemImage: "person") }
}
.tint(.escoPrimary)
`}</Code>
      <ul className="dev-notes">
        <li>Use the system back button. A custom one breaks the edge-swipe gesture users rely on.</li>
        <li>
          Root tabs may use large titles; pushed detail screens use <T>.navigationBarTitleDisplayMode(.inline)</T>.
        </li>
        <li>
          Search uses <T>.searchable</T>, so it sits where iOS users expect it.
        </li>
        <li>Keep the tab bar visible on root screens. Hide it only for full-screen tasks such as a report wizard.</li>
      </ul>
    </div>
  );
}

function Components() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        Prefer the <strong className="hl">system control styled with Esco tokens</strong> over a custom one. It brings
        VoiceOver, Dynamic Type, and haptics for free.
      </Rule>
      <Table
        head={["Esco pattern", "SwiftUI", "Rule"]}
        rows={[
          ["Primary action", <><T>.buttonStyle(.borderedProminent)</T>, <T>.controlSize(.large)</T></>, "One per screen, in a bottom bar via safeAreaInset"],
          ["Record action", <T>.buttonStyle(.bordered)</T>, "Full width at the foot of the record"],
          ["Cancel, tertiary", <T>.buttonStyle(.borderless)</T>, "Text only"],
          ["Destructive", <T>{"Button(role: .destructive)"}</T>, "Confirm with .confirmationDialog first"],
          ["Pick one", <><T>.sheet</T> with <T>.presentationDetents</T></>, "Drag indicator visible, context stays behind"],
          ["Short choice from a control", <T>Menu</T>, "For three to seven options"],
          ["View switch", <T>{"Picker(…).pickerStyle(.segmented)"}</T>, "Two to four options"],
          ["On or off", <T>Toggle</T>, "Never a checkbox look-alike"],
          ["Date", <T>DatePicker</T>, "System picker, tinted"],
          ["Record list", <><T>List</T> with <T>.insetGrouped</T></>, "Identity and status lead"],
          ["Status", <T>EscoStatusPill</T>, "Text plus color"],
        ]}
      />
      <Code title="Components/Buttons.swift" lang="swift">{`
Button("Submit report") { submit() }
    .buttonStyle(.borderedProminent)
    .controlSize(.large)
    .buttonBorderShape(.roundedRectangle(radius: EscoRadius.control))
    .tint(.escoPrimary)
    .frame(maxWidth: .infinity)

Button("Open report") { open(report) }      // record action
    .buttonStyle(.bordered)
    .controlSize(.large)
    .tint(.escoPrimary)
    .frame(maxWidth: .infinity)
`}</Code>
      <Code title="Components/EscoStatusPill.swift" lang="swift">{`
enum StatusFamily { case issued, approved, revision, rejected, pending }

struct EscoStatusPill: View {
    let label: String
    let family: StatusFamily

    var body: some View {
        HStack(spacing: 6) {
            Circle().fill(fg).frame(width: 6, height: 6).accessibilityHidden(true)
            Text(label).font(.escoCaption)
        }
        .foregroundStyle(fg)
        .padding(.horizontal, 10)
        .padding(.vertical, 3)
        .background(bg, in: Capsule())
    }

    // Color sets "StatusIssuedBg", "StatusIssuedFg", … with Dark variants.
    private var bg: Color { Color("Status\\(name)Bg") }
    private var fg: Color { Color("Status\\(name)Fg") }
    private var name: String {
        switch family {
        case .issued: "Issued"
        case .approved: "Approved"
        case .revision: "Revision"
        case .rejected: "Rejected"
        case .pending: "Pending"
        }
    }
}
`}</Code>
      <Code title="Pick-one sheet" lang="swift">{`
.sheet(isPresented: $choosingEngineer) {
    NavigationStack {
        List(engineers, selection: $engineerID) { Text($0.name) }
            .navigationTitle("Choose engineer")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Cancel") { choosingEngineer = false } }
            }
    }
    .presentationDetents([.medium, .large])
    .presentationDragIndicator(.visible)
}
`}</Code>
    </div>
  );
}

function Forms() {
  return (
    <div className="prose">
      <p>
        The visible label sits above the field, as on every Esco platform. The field keeps the same label for VoiceOver,
        and the visible copy is hidden from it so it isn’t read twice.
      </p>
      <Code title="Components/EscoField.swift" lang="swift">{`
struct EscoField: View {
    let label: String
    let prompt: String
    @Binding var text: String
    var error: String?

    var body: some View {
        VStack(alignment: .leading, spacing: EscoSpace.s8) {
            Text(label)
                .font(.escoMeta.weight(.semibold))
                .foregroundStyle(Color.escoText)
                .accessibilityHidden(true)
            TextField(label, text: $text, prompt: Text(prompt))
                .font(.escoBody)
                .padding(.horizontal, EscoSpace.s16)
                .frame(minHeight: EscoSize.field)
                .background(Color.escoSurface, in: .rect(cornerRadius: EscoRadius.control))
                .overlay(
                    RoundedRectangle(cornerRadius: EscoRadius.control)
                        .stroke(error == nil ? Color.escoInputBorder : Color.escoError, lineWidth: error == nil ? 1 : 2)
                )
            if let error {
                Label(error, systemImage: "exclamationmark.circle")
                    .font(.escoMeta)
                    .foregroundStyle(Color.escoError)
            }
        }
    }
}
`}</Code>
      <ul className="dev-notes">
        <li>
          Set <T>.textContentType</T>, <T>.keyboardType</T>, and <T>.submitLabel</T> so AutoFill and the keyboard fit
          the field.
        </li>
        <li>
          Move between fields with <T>@FocusState</T>; on submit, focus the first invalid field.
        </li>
        <li>Long forms are pushed steps with a fixed bottom action bar, not a sheet.</li>
      </ul>
    </div>
  );
}

function A11y() {
  return (
    <div className="prose">
      <Rule icon={Accessibility}>
        Test with <strong className="hl">VoiceOver on and the largest text size</strong> before every review. Most iOS
        accessibility bugs show up in those two minutes.
      </Rule>
      <Table
        head={["Need", "Do this"]}
        rows={[
          ["Touch target", <><T>.frame(minWidth: 48, minHeight: 48)</T> plus <T>.contentShape(.rect)</T></>],
          ["Icon-only button", <><T>Label("Close", systemImage: "xmark")</T> with <T>.labelStyle(.iconOnly)</T></>],
          ["Record row", <><T>.accessibilityElement(children: .combine)</T> so it reads as one item</>],
          ["Status", "Always in the label text, never the dot color alone"],
          ["Reduced motion", <><T>@Environment(\.accessibilityReduceMotion)</T>, then no animation</>],
          ["Increase Contrast", "High Contrast variants in the asset catalog"],
          ["Announcements", <><T>AccessibilityNotification.Announcement("Report sent").post()</T></>],
        ]}
      />
      <Code title="Reduced motion" lang="swift">{`
@Environment(\\.accessibilityReduceMotion) private var reduceMotion

withAnimation(reduceMotion ? nil : EscoMotion.sheet) {
    searchOpen = true
}
`}</Code>
      <p>
        Run Accessibility Inspector’s audit on each new screen, then check the largest accessibility text size: nothing
        clipped, nothing overlapping, every row still readable.
      </p>
    </div>
  );
}

function SystemLook() {
  return (
    <div className="prose">
      <Rule icon={Moon}>
        Let the system draw <strong className="hl">its own chrome</strong>. Esco color belongs in the content, not
        painted over the bars.
      </Rule>
      <ul className="dev-notes">
        <li>
          Keep the standard navigation bar, tab bar, and toolbars. They pick up the current system material, including
          Liquid Glass on iOS 26, without extra code.
        </li>
        <li>Don’t paint opaque brand fills behind the bars, and keep text over translucent material legible.</li>
        <li>Dark mode comes from the asset catalog. Never branch on the color scheme to pick a hex.</li>
        <li>
          Use SF Symbols as the iOS icon set: they scale with Dynamic Type and match system controls. Map each shared
          icon name to one symbol, and don’t mix symbols and custom SVGs on one screen.
        </li>
        <li>Respect safe areas. Put a bottom action bar in <T>.safeAreaInset(edge: .bottom)</T>.</li>
      </ul>
    </div>
  );
}

const CHECKLIST = [
  "Colors from the asset catalog with Dark and High Contrast variants. No hex in views.",
  "Noto Sans through Font.escoX, tied to a text style; Dynamic Type works up to accessibility sizes.",
  "Every target at least 48 × 48 pt.",
  "System back button and edge swipe intact; standard bars, no custom chrome.",
  "One prominent button per screen; record actions bordered and full width.",
  "Pickers are sheets with detents and a visible drag indicator.",
  "VoiceOver reads every control with a name; rows combine into one element.",
  "Reduce Motion removes animation.",
  "Checked on the smallest and largest supported iPhones, in landscape, and in dark mode.",
];

function Checklist() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>Run through this before asking for review.</Rule>
      <Checks items={CHECKLIST} />
      <Refs items={[PLATFORM_REFS.hig, PLATFORM_REFS.appleA11y, PLATFORM_REFS.swiftui, PLATFORM_REFS.wcag]} />
    </div>
  );
}

export const ios: PageContent = {
  lead: "Building Esco for iPhone and iPad in Swift and SwiftUI, following the Apple Human Interface Guidelines for behavior and Esco tokens for identity.",
  art: "ios",
  guide: {
    meta: ["About 12 minutes", "9 chapters in 3 parts", "Swift, SwiftUI, Apple HIG"],
    questions: [
      { q: "Where do dark-mode colors go?", id: "tokens" },
      { q: "How does Noto Sans work with Dynamic Type?", id: "typography" },
      { q: "Can I make a custom back button?", id: "navigation" },
      { q: "Which button style is the primary action?", id: "components" },
      { q: "How big is a touch target on iOS?", id: "accessibility" },
      { q: "SF Symbols or our own icons?", id: "system-look" },
    ],
  },
  sections: [
    {
      id: "setup",
      title: "Project setup",
      part: { title: "Set up", description: "Font, tokens, and type." },
      summary: "SwiftUI first, a Design folder, bundled fonts.",
      body: <Setup />,
      takeaway: "SwiftUI screens, UIKit only when wrapped, fonts registered in Info.plist.",
    },
    {
      id: "tokens",
      title: "Tokens in Swift",
      summary: "Asset catalog for color, constants for everything else.",
      body: <Tokens />,
      takeaway: "Color sets carry light, dark, and high contrast. Views name them.",
      more: { href: "/foundations/design-tokens", label: "Design tokens reference" },
    },
    {
      id: "typography",
      title: "Typography and Dynamic Type",
      summary: "Noto Sans sizes tied to system text styles.",
      body: <Typography />,
      takeaway: "Font.custom(relativeTo:) for every size. Never a fixed font.",
      more: { href: "/foundations/typography", label: "Typography" },
    },
    {
      id: "navigation",
      title: "Navigation",
      part: { title: "Build the screens", description: "Structure, components, and forms." },
      summary: "TabView, NavigationStack, and the system back gesture.",
      body: <Navigation />,
      takeaway: "Four tabs, a stack per tab, the system back button.",
    },
    {
      id: "components",
      title: "Components",
      summary: "Esco patterns mapped to SwiftUI controls.",
      body: <Components />,
      takeaway: "System controls, Esco tint and shape. Prominent once, bordered for records, sheets for picking.",
    },
    {
      id: "forms",
      title: "Forms",
      summary: "Label above, read once, errors in words.",
      body: <Forms />,
      takeaway: "EscoField for every input, with content type, keyboard, and focus set.",
      more: { href: "/patterns/forms", label: "Forms" },
    },
    {
      id: "accessibility",
      title: "Accessibility",
      part: { title: "Make it solid", description: "Accessible, native-looking, reviewed." },
      summary: "VoiceOver, targets, motion, and contrast.",
      body: <A11y />,
      takeaway: "48 pt targets, named controls, combined rows, and no motion when it’s turned off.",
      more: { href: "/foundations/accessibility", label: "Accessibility" },
    },
    {
      id: "system-look",
      title: "System look and icons",
      summary: "Bars, materials, dark mode, and SF Symbols.",
      body: <SystemLook />,
      takeaway: "Standard chrome, asset-catalog colors, one icon set per screen.",
    },
    {
      id: "checklist",
      title: "iOS checklist",
      summary: "Nine checks before review.",
      body: <Checklist />,
      takeaway: "Tick all nine, then open the pull request.",
      more: { href: "/get-started/developing", label: "For developers" },
    },
  ],
};
