import React, { useState } from 'react';
import { CATEGORIES } from '../components/categories';

interface SectionPickerProps {
	sectionKey: string | null;
	setSectionKey: (key: string | null) => void;
}

export function SectionPicker({
	sectionKey,
	setSectionKey,
}: SectionPickerProps) {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	if (activeCategory) {
		const category = CATEGORIES.find((c) => c.key === activeCategory);
		return (
			<div className="space-y-3">
				<button
					onClick={() => setActiveCategory(null)}
					className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 border w-full"
				>
					← Назад к категориям
				</button>
				<div className="grid grid-cols-1 gap-2">
					{category?.sections.map((s) => (
						<button
							key={s.key}
							onClick={() => setSectionKey(s.key)}
							className={`p-3 rounded-2xl border text-left ${
								sectionKey === s.key
									? 'bg-emerald-50 border-emerald-300'
									: 'bg-white border-gray-200'
							}`}
						>
							<div className="font-medium">{s.title}</div>
							<div className="text-xs text-gray-500">Теория + 100+ заданий</div>
						</button>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-2">
			{CATEGORIES.map((cat) => (
				<button
					key={cat.key}
					onClick={() => setActiveCategory(cat.key)}
					className="p-4 rounded-2xl border bg-white border-gray-200 text-left"
				>
					<div className="font-semibold">{cat.title}</div>
					<div className="text-xs text-gray-500">
						{cat.sections.length} подразделов
					</div>
				</button>
			))}
		</div>
	);
}
