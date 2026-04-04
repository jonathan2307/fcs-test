import { type SheetMitglied } from "@/lib/sheets";
import { User, Mail } from "lucide-react";

export function BoardCard({ member }: { member: SheetMitglied }) {
  return (
    <div className="bg-white border border-border rounded-[5px] overflow-hidden hover:border-primary hover:shadow-sm transition-all">
      <div className="bg-surface-alt aspect-[5/4] relative overflow-hidden">
        {member.bildUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.bildUrl}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User size={28} className="text-primary/40" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="font-heading font-700 text-base text-text uppercase leading-tight">
          {member.name}
        </p>
        <p className="text-xs font-body text-text-muted mt-0.5">{member.funktion}</p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Mail size={12} />
            {member.email}
          </a>
        )}
      </div>
    </div>
  );
}
