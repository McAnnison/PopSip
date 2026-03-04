import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('returns a single class name', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('merges multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional class names', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('merges conflicting Tailwind classes (tailwind-merge)', () => {
    // tailwind-merge resolves conflicts – last wins
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('handles undefined/null gracefully', () => {
    expect(cn('foo', undefined, null as any)).toBe('foo');
  });

  it('returns empty string when no arguments are truthy', () => {
    expect(cn(false as any, undefined, null as any)).toBe('');
  });
});
