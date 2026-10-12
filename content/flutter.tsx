import { Accessibility, Braces, Layers, ListChecks, Moon, Smartphone } from "lucide-react";
import type { PageContent } from "./index";
import { Rule } from "./principles";
import { Checks, Code, MOBILE_TYPE, PLATFORM_REFS, Refs, T, Table } from "./dev-kit";

/* ---------------------------------------------------------------------------
   Flutter guide — Material 3 structure, Esco identity.
   Values and component rules mirror FSM-Mobile (MOBILE_DESIGN_NOTES.md
   "Flutter handoff", COMPONENT_SYSTEM.md, and the css token files).
   --------------------------------------------------------------------------- */

function Setup() {
  return (
    <div className="prose">
      <Rule icon={Smartphone}>
        Material 3 gives the <strong className="hl">structure and behavior</strong>. Esco tokens replace its default
        color, type, and shape.
      </Rule>
      <p>
        Bundle Noto Sans in the app instead of fetching it at runtime. Field engineers work offline, and a fallback font
        changes every line length.
      </p>
      <Code title="pubspec.yaml" lang="yaml">{`
flutter:
  uses-material-design: true
  fonts:
    - family: NotoSans
      fonts:
        - asset: assets/fonts/NotoSans-Regular.ttf
          weight: 400
        - asset: assets/fonts/NotoSans-Medium.ttf
          weight: 500
        - asset: assets/fonts/NotoSans-SemiBold.ttf
          weight: 600
`}</Code>
      <Code title="Project layout" lang="text">{`
lib/
  design/
    esco_tokens.dart     colors, spacing, radius, motion — values only
    esco_theme.dart      ThemeData for light and dark
    esco_status.dart     ThemeExtension for the five status families
  widgets/               shared widgets: EscoStatusPill, EscoField, RecordAction …
  features/schedule/     screens compose widgets; no restyled copies
`}</Code>
    </div>
  );
}

function Tokens() {
  return (
    <div className="prose">
      <Rule icon={Braces}>
        Raw values live in <T>esco_tokens.dart</T> only. Widgets read colors through{" "}
        <strong className="hl">Theme.of(context)</strong>, so dark mode works without a second code path.
      </Rule>
      <Code title="lib/design/esco_tokens.dart" lang="dart">{`
import 'package:flutter/animation.dart';
import 'package:flutter/painting.dart';

abstract final class EscoColors {
  // Light
  static const primary = Color(0xFF00467F);
  static const primaryPressed = Color(0xFF003559);
  static const primaryContainer = Color(0xFFEAF1F7);
  static const background = Color(0xFFF6F8FA);
  static const surface = Color(0xFFFFFFFF);
  static const onSurface = Color(0xFF243342);
  static const onSurfaceVariant = Color(0xFF596B7C);
  static const outline = Color(0xFF7D8F9F);        // input borders, 3:1
  static const outlineVariant = Color(0xFFD8E1EA); // hairlines
  static const error = Color(0xFFC2362F);
  static const navMuted = Color(0xFF5D7485);

  // Dark
  static const primaryDark = Color(0xFF8FBDEC);
  static const onPrimaryDark = Color(0xFF08121B);
  static const primaryContainerDark = Color(0xFF1E2A38);
  static const backgroundDark = Color(0xFF0F151C);
  static const surfaceDark = Color(0xFF182028);
  static const onSurfaceDark = Color(0xFFE8EEF4);
  static const onSurfaceVariantDark = Color(0xFFB6C3CF);
  static const outlineDark = Color(0xFF5D6D7D);
  static const outlineVariantDark = Color(0xFF2E3945);
  static const errorDark = Color(0xFFFF9D95);
}

abstract final class EscoSpace {
  static const s4 = 4.0, s8 = 8.0, s12 = 12.0, s16 = 16.0, s24 = 24.0, s32 = 32.0;
  static const gutter = 16.0, gutterWide = 24.0; // wide at 600 and up
}

abstract final class EscoSize {
  static const touch = 48.0, field = 52.0, icon = 20.0, iconSmall = 18.0, chip = 32.0;
}

abstract final class EscoRadius {
  static const small = 8.0, control = 12.0, card = 16.0, sheet = 28.0;
}

abstract final class EscoMotion {
  static const state = Duration(milliseconds: 180);
  static const sheet = Duration(milliseconds: 320);
  static const ease = Cubic(0.22, 1, 0.36, 1);
}
`}</Code>
      <p>
        Status colors are not Material roles, so they ride on a <T>ThemeExtension</T>. It switches with the theme and
        animates between light and dark like every other color.
      </p>
      <Code title="lib/design/esco_status.dart" lang="dart">{`
import 'package:flutter/material.dart';

enum StatusFamily { issued, approved, revision, rejected, pending }

typedef StatusPair = ({Color bg, Color fg});

@immutable
class EscoStatus extends ThemeExtension<EscoStatus> {
  const EscoStatus(this.pairs);
  final Map<StatusFamily, StatusPair> pairs;

  static const light = EscoStatus({
    StatusFamily.issued: (bg: Color(0xFFE6F0FA), fg: Color(0xFF0A5187)),
    StatusFamily.approved: (bg: Color(0xFFE7F6ED), fg: Color(0xFF146C34)),
    StatusFamily.revision: (bg: Color(0xFFFDF2E1), fg: Color(0xFFB45309)),
    StatusFamily.rejected: (bg: Color(0xFFFDEAEA), fg: Color(0xFFC2362F)),
    StatusFamily.pending: (bg: Color(0xFFEEF1F5), fg: Color(0xFF4A5B69)),
  });

  static const dark = EscoStatus({
    StatusFamily.issued: (bg: Color(0xFF132335), fg: Color(0xFF8EC2F0)),
    StatusFamily.approved: (bg: Color(0xFF10301E), fg: Color(0xFF6FD79B)),
    StatusFamily.revision: (bg: Color(0xFF32240F), fg: Color(0xFFF3BD70)),
    StatusFamily.rejected: (bg: Color(0xFF3A1B1A), fg: Color(0xFFFF9D95)),
    StatusFamily.pending: (bg: Color(0xFF232C36), fg: Color(0xFFC0CDD9)),
  });

  StatusPair of(StatusFamily f) => pairs[f]!;

  @override
  EscoStatus copyWith({Map<StatusFamily, StatusPair>? pairs}) => EscoStatus(pairs ?? this.pairs);

  @override
  EscoStatus lerp(EscoStatus? other, double t) {
    if (other == null) return this;
    return EscoStatus({
      for (final f in StatusFamily.values)
        f: (
          bg: Color.lerp(of(f).bg, other.of(f).bg, t)!,
          fg: Color.lerp(of(f).fg, other.of(f).fg, t)!,
        ),
    });
  }
}
`}</Code>
    </div>
  );
}

function Theme() {
  return (
    <div className="prose">
      <p>
        Build the <T>ColorScheme</T> explicitly. <T>ColorScheme.fromSeed</T> would shift the brand navy and generate
        tones the contrast tests never checked.
      </p>
      <Code title="lib/design/esco_theme.dart" lang="dart">{`
import 'package:flutter/material.dart';
import 'esco_status.dart';
import 'esco_tokens.dart';

ThemeData escoTheme(Brightness b) {
  final dark = b == Brightness.dark;
  final scheme = ColorScheme(
    brightness: b,
    primary: dark ? EscoColors.primaryDark : EscoColors.primary,
    onPrimary: dark ? EscoColors.onPrimaryDark : Colors.white,
    primaryContainer: dark ? EscoColors.primaryContainerDark : EscoColors.primaryContainer,
    onPrimaryContainer: dark ? EscoColors.primaryDark : EscoColors.primary,
    secondary: dark ? EscoColors.primaryDark : EscoColors.primary, // accent is navy too
    onSecondary: dark ? EscoColors.onPrimaryDark : Colors.white,
    error: dark ? EscoColors.errorDark : EscoColors.error,
    onError: dark ? EscoColors.onPrimaryDark : Colors.white,
    surface: dark ? EscoColors.surfaceDark : EscoColors.surface,
    onSurface: dark ? EscoColors.onSurfaceDark : EscoColors.onSurface,
    onSurfaceVariant: dark ? EscoColors.onSurfaceVariantDark : EscoColors.onSurfaceVariant,
    outline: dark ? EscoColors.outlineDark : EscoColors.outline,
    outlineVariant: dark ? EscoColors.outlineVariantDark : EscoColors.outlineVariant,
  );

  final controlShape = RoundedRectangleBorder(borderRadius: BorderRadius.circular(EscoRadius.control));
  const minTarget = Size(64, EscoSize.touch);

  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    fontFamily: 'NotoSans',
    scaffoldBackgroundColor: dark ? EscoColors.backgroundDark : EscoColors.background,
    materialTapTargetSize: MaterialTapTargetSize.padded,
    textTheme: const TextTheme(
      headlineSmall: TextStyle(fontSize: 26, fontWeight: FontWeight.w600), // Today heading
      titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),    // page title
      titleMedium: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),   // section
      bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),     // body, record identity
      bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400),    // metadata
      labelMedium: TextStyle(fontSize: 13, fontWeight: FontWeight.w500),   // caption, badge, nav
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(minimumSize: minTarget, shape: controlShape),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: minTarget,
        shape: controlShape,
        side: BorderSide(color: scheme.outline),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(minimumSize: minTarget, shape: controlShape),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: dark ? const Color(0xFF131A21) : Colors.white,
      constraints: const BoxConstraints(minHeight: EscoSize.field),
      contentPadding: const EdgeInsets.symmetric(horizontal: EscoSpace.s16, vertical: 14),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(EscoRadius.control)),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(EscoRadius.control),
        borderSide: BorderSide(color: scheme.outline),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(EscoRadius.control),
        borderSide: BorderSide(color: scheme.primary, width: 2),
      ),
    ),
    cardTheme: CardThemeData(
      elevation: 0,
      margin: EdgeInsets.zero,
      color: scheme.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(EscoRadius.card),
        side: BorderSide(color: scheme.outlineVariant),
      ),
    ),
    chipTheme: ChipThemeData(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(EscoRadius.small)),
    ),
    bottomSheetTheme: const BottomSheetThemeData(
      showDragHandle: true,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(EscoRadius.sheet)),
      ),
    ),
    navigationBarTheme: NavigationBarThemeData(
      indicatorColor: scheme.primaryContainer,
      labelTextStyle: WidgetStateProperty.resolveWith((s) => TextStyle(
            fontSize: 13,
            fontWeight: s.contains(WidgetState.selected) ? FontWeight.w600 : FontWeight.w400,
          )),
    ),
    extensions: [dark ? EscoStatus.dark : EscoStatus.light],
  );
}
`}</Code>
      <Code title="lib/main.dart" lang="dart">{`
MaterialApp(
  theme: escoTheme(Brightness.light),
  darkTheme: escoTheme(Brightness.dark),
  themeMode: settings.themeMode, // System, Light, or Dark from Settings
  home: const AppShell(),
);
`}</Code>
      <Table
        head={["Role", "Size", "Weight", "TextTheme slot"]}
        rows={MOBILE_TYPE.map((t) => [t.role, t.size, t.weight, <T>{t.m3}</T>])}
      />
    </div>
  );
}

function Layout() {
  return (
    <div className="prose">
      <p>
        <T>Scaffold</T> with a persistent <T>NavigationBar</T> of four destinations: Today, Modules, Notifications,
        Profile. Content scrolls; nothing text-bearing gets a fixed height.
      </p>
      <Code title="lib/app_shell.dart" lang="dart">{`
Scaffold(
  body: SafeArea(
    child: LayoutBuilder(builder: (context, c) {
      final gutter = c.maxWidth >= 600 ? EscoSpace.gutterWide : EscoSpace.gutter;
      return Padding(
        padding: EdgeInsets.symmetric(horizontal: gutter),
        child: pages[index],
      );
    }),
  ),
  bottomNavigationBar: NavigationBar(
    selectedIndex: index,
    onDestinationSelected: (i) => setState(() => index = i),
    destinations: const [
      NavigationDestination(icon: Icon(Icons.today_outlined), label: 'Today'),
      NavigationDestination(icon: Icon(Icons.apps_outlined), label: 'Modules'),
      NavigationDestination(icon: Icon(Icons.notifications_outlined), label: 'Notifications'),
      NavigationDestination(icon: Icon(Icons.person_outline), label: 'Profile'),
    ],
  ),
);
`}</Code>
      <ul className="dev-notes">
        <li>Use <T>Expanded</T>, <T>Flexible</T>, and <T>Wrap</T>. Avoid fixed heights for anything with text.</li>
        <li>App bar titles are consistent: 22, weight 600. Back and notification controls are 48 × 48.</li>
        <li>A <T>SnackBar</T> appears above the navigation bar, so it never covers records.</li>
        <li>Mobile page search finds pages and destinations, not customer data, unless the screen says otherwise.</li>
      </ul>
    </div>
  );
}

function Components() {
  return (
    <div className="prose">
      <Rule icon={Layers}>
        One implementation per pattern. A module styles its own layout, never these parts.
      </Rule>
      <Table
        head={["Esco pattern", "Flutter", "Rule"]}
        rows={[
          ["Primary action", <T>FilledButton</T>, "One per screen, usually in a fixed bottom bar"],
          ["Record action", <T>OutlinedButton</T>, "Full width at the foot of the record, 8–12 below its content"],
          ["Secondary, cancel", <><T>TextButton</T> or <T>FilledButton.tonal</T></>, "Quieter than the primary"],
          ["Pick one", <T>showModalBottomSheet</T>, "A sheet, never a pushed page. Header pinned, body scrolls"],
          ["Scope chip", <><T>FilterChip</T>, <T>ActionChip</T></>, "32 tall, 8 radius, row scrolls sideways"],
          ["Day bar", "Shared EscoDayBar widget", "Previous day, the day (opens month sheet), next day"],
          ["Record list", <><T>ListTile</T> in an outlined <T>Card</T></>, "Identity and status first, metadata after"],
          ["Status", <T>EscoStatusPill</T>, "Text plus color from the status extension"],
          ["Sections", <><T>TabBar</T>, <T>ExpansionTile</T></>, "Tabs switch content, never trigger actions"],
          ["On or off", <T>Switch</T>, "Not a checkbox, not a two-option segment"],
          ["Progress", <T>LinearProgressIndicator</T>, "4 tall in wizards"],
        ]}
      />
      <Code title="lib/widgets/esco_status_pill.dart" lang="dart">{`
class EscoStatusPill extends StatelessWidget {
  const EscoStatusPill({super.key, required this.label, required this.family});
  final String label;
  final StatusFamily family;

  @override
  Widget build(BuildContext context) {
    final c = Theme.of(context).extension<EscoStatus>()!.of(family);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(color: c.bg, borderRadius: BorderRadius.circular(999)),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 6, height: 6, decoration: BoxDecoration(color: c.fg, shape: BoxShape.circle)),
        const SizedBox(width: 6),
        Text(label, style: Theme.of(context).textTheme.labelMedium?.copyWith(color: c.fg)),
      ]),
    );
  }
}
`}</Code>
      <Code title="Pick-one sheet" lang="dart">{`
final picked = await showModalBottomSheet<Engineer>(
  context: context,
  useSafeArea: true,
  isScrollControlled: true,
  builder: (context) => DraggableScrollableSheet(
    expand: false,
    initialChildSize: 0.6,
    builder: (context, scroll) => Column(children: [
      const SheetHeader(title: 'Choose engineer'), // pinned
      Expanded(
        child: ListView(controller: scroll, children: [
          for (final e in engineers)
            ListTile(
              title: Text(e.name),
              trailing: e == current ? const Icon(Icons.check) : null,
              selected: e == current,
              onTap: () => Navigator.pop(context, e),
            ),
        ]),
      ),
    ]),
  ),
);
`}</Code>
      <p>
        A sheet has four equal exits: back chevron, drag down, tap the scrim, and system back. Dragging starts only on the
        handle or header, so scrolling a long list never dismisses it.
      </p>
    </div>
  );
}

function Forms() {
  return (
    <div className="prose">
      <p>
        The label sits above the field, as on web. <T>MergeSemantics</T> makes TalkBack and VoiceOver read label and
        field as one control.
      </p>
      <Code title="lib/widgets/esco_field.dart" lang="dart">{`
class EscoField extends StatelessWidget {
  const EscoField({super.key, required this.label, this.hint, this.help, this.controller, this.validator, this.keyboardType});
  final String label;
  final String? hint, help;
  final TextEditingController? controller;
  final FormFieldValidator<String>? validator;
  final TextInputType? keyboardType;

  @override
  Widget build(BuildContext context) {
    final t = Theme.of(context).textTheme;
    return MergeSemantics(
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label, style: t.bodyMedium?.copyWith(fontWeight: FontWeight.w600)),
        const SizedBox(height: EscoSpace.s8),
        TextFormField(
          controller: controller,
          validator: validator,
          keyboardType: keyboardType,
          textInputAction: TextInputAction.next,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          decoration: InputDecoration(hintText: hint, helperText: help, errorMaxLines: 3),
        ),
      ]),
    );
  }
}
`}</Code>
      <ul className="dev-notes">
        <li>16 between fields, 24 between sections, 8 from label to field.</li>
        <li>Set <T>keyboardType</T> and <T>textInputAction</T> so the keyboard matches the field.</li>
        <li>Errors say what to fix. On submit, scroll to and focus the first invalid field.</li>
        <li>Long forms are full-screen steps with a 4-tall progress bar and a fixed bottom action bar, not a dialog.</li>
      </ul>
    </div>
  );
}

function A11y() {
  return (
    <div className="prose">
      <Rule icon={Accessibility}>
        Flutter draws its own pixels, so accessibility is only what you <strong className="hl">tell the semantics tree</strong>.
      </Rule>
      <Table
        head={["Need", "Do this"]}
        rows={[
          ["Icon-only button", <><T>IconButton(tooltip: 'Close')</T>. The tooltip becomes the label</>],
          ["Custom tappable", <><T>Semantics(button: true, label: …)</T> around an <T>InkWell</T>, 48 × 48 minimum</>],
          ["Record row", <><T>MergeSemantics</T> so the row reads as one item</>],
          ["Decorative icon", <><T>ExcludeSemantics</T></>],
          ["Live result", <><T>SemanticsService.announce</T> after sync or submit</>],
          ["Text size", <>Respect <T>MediaQuery.textScalerOf</T>. Never clamp it; test at 200%</>],
          ["Reduced motion", <><T>MediaQuery.disableAnimationsOf(context)</T> → <T>Duration.zero</T></>],
        ]}
      />
      <Code title="test/a11y_test.dart" lang="dart">{`
testWidgets('Service report screen meets accessibility guidelines', (tester) async {
  final handle = tester.ensureSemantics();
  await tester.pumpWidget(const TestApp(child: ServiceReportScreen()));

  await expectLater(tester, meetsGuideline(androidTapTargetGuideline)); // 48 x 48
  await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));     // 44 x 44
  await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
  await expectLater(tester, meetsGuideline(textContrastGuideline));

  handle.dispose();
});
`}</Code>
    </div>
  );
}

function DarkMotion() {
  return (
    <div className="prose">
      <Rule icon={Moon}>
        Dark mode is the same structure re-lit. Primary turns light, and anything <strong className="hl">filled</strong>{" "}
        with it takes near-black text.
      </Rule>
      <p>
        Settings offers System, Light, and Dark. System follows the device and keeps following it, so map it to{" "}
        <T>ThemeMode.system</T>. Never hard-code <T>Colors.white</T> on a primary fill; use{" "}
        <T>colorScheme.onPrimary</T>.
      </p>
      <Code title="Motion with reduced-motion support" lang="dart">{`
final reduce = MediaQuery.disableAnimationsOf(context);

AnimatedContainer(
  duration: reduce ? Duration.zero : EscoMotion.state,   // 180ms
  curve: EscoMotion.ease,                                // Cubic(0.22, 1, 0.36, 1)
  color: selected ? scheme.primaryContainer : scheme.surface,
  child: child,
);
`}</Code>
      <p>
        The expanding search uses one <T>AnimationController</T> (360ms) with a <T>CurvedAnimation</T>: the search
        icon translates, brand and input cross-fade, suggestions open with a clipped <T>SizeTransition</T> in normal flow,
        not as an overlay. Keep one <T>TextField</T> and <T>FocusNode</T> and request focus on tap.
      </p>
    </div>
  );
}

function Adaptive() {
  return (
    <div className="prose">
      <p>
        When the Flutter app also ships on iPhone, the Esco look stays, but iOS behavior must not break.
      </p>
      <Table
        head={["Behavior", "Do this"]}
        rows={[
          ["Back swipe from the edge", <>Keep the default <T>CupertinoPageTransitionsBuilder</T> on iOS. Don’t replace routes with custom transitions</>],
          ["Switches, sliders, dialogs", <>Use the <T>.adaptive</T> constructors: <T>Switch.adaptive</T>, <T>AlertDialog.adaptive</T>, <T>showAdaptiveDialog</T></>],
          ["Scrolling", "Leave the platform scroll physics alone"],
          ["Date and time", "Platform picker on each OS, Esco colors via the theme"],
          ["Safe areas", <><T>SafeArea</T> on every screen; the bottom bar adds the home-indicator inset</>],
        ]}
      />
    </div>
  );
}

const CHECKLIST = [
  "Explicit ColorScheme for light and dark. No fromSeed, no hex in widgets.",
  "Noto Sans bundled; TextTheme slots match the type table.",
  "Every touch target 48 × 48; fields 52 tall.",
  "One FilledButton per screen; record actions outlined and full width.",
  "Pickers are bottom sheets with a pinned header and four exits.",
  "Status uses EscoStatusPill with text, never color alone.",
  "Semantics labels on icon-only and custom controls; guideline tests pass.",
  "Checked at 320, 360, 390, 600 wide, landscape, 200% text, and dark mode.",
  "Animations go to zero with disableAnimations.",
];

function Checklist() {
  return (
    <div className="prose">
      <Rule icon={ListChecks}>Run through this before asking for review.</Rule>
      <Checks items={CHECKLIST} />
      <Refs items={[PLATFORM_REFS.m3, PLATFORM_REFS.flutterM3, PLATFORM_REFS.flutterA11y, PLATFORM_REFS.wcag]} />
    </div>
  );
}

export const flutter: PageContent = {
  lead: "Building the Esco mobile app in Flutter with Material 3: tokens in Dart, one theme for light and dark, the shared widgets, and the checks before review.",
  art: "flutter",
  guide: {
    meta: ["About 12 minutes", "10 chapters in 3 parts", "Flutter, Material 3, Dart 3"],
    questions: [
      { q: "Can I use ColorScheme.fromSeed?", id: "theme" },
      { q: "Where do status colors come from?", id: "tokens" },
      { q: "Dialog or bottom sheet?", id: "components" },
      { q: "How do I put the label above a field?", id: "forms" },
      { q: "How do I test tap targets and contrast?", id: "accessibility" },
      { q: "What changes when it runs on iPhone?", id: "adaptive" },
    ],
  },
  sections: [
    {
      id: "setup",
      title: "Project setup",
      part: { title: "Set up", description: "Font, tokens, and the theme." },
      summary: "Bundled Noto Sans and a design folder.",
      body: <Setup />,
      takeaway: "Bundle the font. Keep tokens, theme, and status in lib/design.",
    },
    {
      id: "tokens",
      title: "Tokens in Dart",
      summary: "Constants for values, a ThemeExtension for status.",
      body: <Tokens />,
      takeaway: "Values live in esco_tokens.dart. Widgets take colors from the theme; spacing and radius constants are fine to use directly.",
      more: { href: "/foundations/design-tokens", label: "Design tokens reference" },
    },
    {
      id: "theme",
      title: "ThemeData",
      summary: "ColorScheme, TextTheme, and component themes for light and dark.",
      body: <Theme />,
      takeaway: "Explicit ColorScheme, Noto Sans TextTheme, 48 minimum on every button theme.",
    },
    {
      id: "layout",
      title: "Layout and navigation",
      part: { title: "Build the screens", description: "Shell, components, and forms." },
      summary: "Scaffold, NavigationBar, and gutters by width.",
      body: <Layout />,
      takeaway: "Four destinations, 16 or 24 gutters, no fixed heights on text.",
    },
    {
      id: "components",
      title: "Components",
      summary: "Esco patterns mapped to Material widgets.",
      body: <Components />,
      takeaway: "Filled once, outlined for records, sheets for picking, pills with words.",
    },
    {
      id: "forms",
      title: "Forms",
      summary: "Label above, one semantic control, full-screen steps.",
      body: <Forms />,
      takeaway: "EscoField for every input. Long forms are steps, not dialogs.",
      more: { href: "/patterns/forms", label: "Forms" },
    },
    {
      id: "accessibility",
      title: "Accessibility",
      part: { title: "Make it solid", description: "Accessible, themed, adaptive, reviewed." },
      summary: "The semantics tree, text scaling, and guideline tests.",
      body: <A11y />,
      takeaway: "Name every control, never clamp text, and let the guideline tests fail the build.",
    },
    {
      id: "dark-and-motion",
      title: "Dark mode and motion",
      summary: "Re-lit colors and motion that respects the setting.",
      body: <DarkMotion />,
      takeaway: "onPrimary on primary fills, ThemeMode.system, Duration.zero when motion is off.",
      more: { href: "/foundations/motion", label: "Motion" },
    },
    {
      id: "adaptive",
      title: "Running on iOS",
      summary: "Keep iOS behavior when Flutter ships on iPhone.",
      body: <Adaptive />,
      takeaway: "Esco look, iOS gestures and controls.",
      more: { href: "/get-started/ios", label: "iOS native guide" },
    },
    {
      id: "checklist",
      title: "Flutter checklist",
      summary: "Nine checks before review.",
      body: <Checklist />,
      takeaway: "Tick all nine, then open the pull request.",
      more: { href: "/get-started/developing", label: "For developers" },
    },
  ],
};
