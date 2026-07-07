import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { type MenuItem, priceForItem } from "@/lib/menu-data";
import { useCart, formatMoney } from "@/lib/cart-store";
import { toast } from "sonner";

export function MenuItemDialog({
  item,
  open,
  onOpenChange,
}: {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const addLine = useCart((s) => s.addLine);
  const [sizeId, setSizeId] = useState<string>("");
  const [milkId, setMilkId] = useState<string>("");
  const [extras, setExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  // Reset when item changes
  useMemo(() => {
    if (item) {
      setSizeId(item.sizes?.[0]?.id ?? "");
      const milkGroup = item.optionGroups?.find((g) => g.id === "milk");
      setMilkId(milkGroup?.options[0]?.id ?? "");
      setExtras([]);
      setNotes("");
      setQty(1);
    }
  }, [item?.id]);

  if (!item) return null;

  const milkGroup = item.optionGroups?.find((g) => g.id === "milk");
  const extrasGroup = item.optionGroups?.find((g) => g.id === "extras");

  const unitPrice =
    priceForItem(item, sizeId, extras) +
    (milkGroup?.options.find((o) => o.id === milkId)?.priceDelta ?? 0);

  const total = unitPrice * qty;

  const handleAdd = () => {
    const size = item.sizes?.find((s) => s.id === sizeId);
    const milk = milkGroup?.options.find((o) => o.id === milkId);
    const extraObjs =
      extrasGroup?.options
        .filter((o) => extras.includes(o.id))
        .map((o) => ({ id: o.id, label: o.label, priceDelta: o.priceDelta })) ?? [];
    addLine({
      itemId: item.id,
      name: item.name,
      image: item.image,
      unitPrice,
      quantity: qty,
      sizeId: size?.id,
      sizeLabel: size?.label,
      milkId: milk?.id,
      milkLabel: milk?.label,
      extras: extraObjs,
      notes: notes.trim() || undefined,
    });
    toast.success(`${item.name} added to cart`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-lg">
        <img
          src={item.image}
          alt={item.name}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{item.name}</DialogTitle>
            <DialogDescription>{item.description}</DialogDescription>
          </DialogHeader>

          {item.sizes && (
            <div className="mt-6">
              <Label className="text-sm font-medium">Size</Label>
              <RadioGroup value={sizeId} onValueChange={setSizeId} className="mt-2 gap-2">
                {item.sizes.map((s) => (
                  <label
                    key={s.id}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={s.id} id={`size-${s.id}`} />
                      <span className="text-sm">{s.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {s.priceDelta > 0 ? `+${formatMoney(s.priceDelta)}` : "—"}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {milkGroup && (
            <div className="mt-5">
              <Label className="text-sm font-medium">{milkGroup.label}</Label>
              <RadioGroup value={milkId} onValueChange={setMilkId} className="mt-2 gap-2">
                {milkGroup.options.map((o) => (
                  <label
                    key={o.id}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={o.id} id={`milk-${o.id}`} />
                      <span className="text-sm">{o.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {o.priceDelta > 0 ? `+${formatMoney(o.priceDelta)}` : "Included"}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {extrasGroup && (
            <div className="mt-5">
              <Label className="text-sm font-medium">Extras</Label>
              <div className="mt-2 space-y-2">
                {extrasGroup.options.map((o) => {
                  const checked = extras.includes(o.id);
                  return (
                    <label
                      key={o.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`ex-${o.id}`}
                          checked={checked}
                          onCheckedChange={(v) =>
                            setExtras((prev) =>
                              v ? [...prev, o.id] : prev.filter((x) => x !== o.id),
                            )
                          }
                        />
                        <span className="text-sm">{o.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        +{formatMoney(o.priceDelta)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-5">
            <Label htmlFor="notes" className="text-sm font-medium">
              Special instructions
            </Label>
            <Textarea
              id="notes"
              placeholder="Extra hot, no foam, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 200))}
              className="mt-2"
              rows={2}
            />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center rounded-full border border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="rounded-full"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center font-medium" aria-live="polite">
                {qty}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="rounded-full"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1 rounded-full" onClick={handleAdd}>
              Add · {formatMoney(total)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
