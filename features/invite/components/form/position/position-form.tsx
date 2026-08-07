

import { Reveal } from '@/components/common/Reveal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { weddingConfig } from '@/lib/wedding-config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Armchair, Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormValues, schema } from './schema';
import { useGuestStore } from '@/store/useGuestStore';
import { useRouter } from 'next/navigation';

function PositionForm() {
    const router = useRouter();
    const setSeat = useGuestStore((s) => s.setSeat);
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { table: "" as unknown as number, chair: "" as unknown as number },
    });

    const onSubmit = async (data: FormValues) => {
        const parsed = schema.parse(data);
        setSeat({ table: parsed.table, chair: parsed.chair });
        console.log(data);
        router.push('invite/menu');
    }

    return (
        <Reveal delay={0.15} className="surface-card mt-8 p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <Utensils className="size-4 text-primary" aria-hidden />
                        Numéro de table
                    </label>
                    <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={weddingConfig.tableCount}
                        placeholder="Ex : 4"
                        className="min-h-12 text-lg"
                        {...register("table")}
                    />
                    {errors.table && (
                        <p className="text-sm text-destructive">{errors.table.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <Armchair className="size-4 text-primary" aria-hidden />
                        Numéro de chaise
                    </label>
                    <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={12}
                        placeholder="Ex : 2"
                        className="min-h-12 text-lg"
                        {...register("chair")}
                    />
                    {errors.chair && (
                        <p className="text-sm text-destructive">{errors.chair.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-12 w-full rounded-full"
                >
                    {isSubmitting ? "Chargement..." : "Voir le menu"}
                </Button>
            </form>
        </Reveal>
    )
}

export default PositionForm