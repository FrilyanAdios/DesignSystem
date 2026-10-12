import { FilePen } from "lucide-react";

export function Placeholder({ label = "Content coming soon" }: { label?: string }) {
  return (
    <div className="placeholder">
      <span className="ph-icon" aria-hidden="true">
        <FilePen size={18} />
      </span>
      <span>
        <strong>{label}</strong>
        This section is reserved and will be written in a later release.
      </span>
    </div>
  );
}
