import { ANNOUNCEMENT_BANNER } from '@/lib/constants';

export function AnnouncementBar() {
  return (
    <div className="w-full bg-ink-950 text-white text-xs text-center py-2 px-4">
      <p className="font-medium tracking-wide">{ANNOUNCEMENT_BANNER}</p>
    </div>
  );
}
