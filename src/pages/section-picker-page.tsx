import React, { useState } from 'react';
import { SectionPicker } from '../components/section-picker';

export default function SectionPickerPage() {
	const [sectionKey, setSectionKey] = useState<string | null>(null);

	return (
		<div className="p-4">
			<h1 className="text-xl font-semibold mb-4">Выбор раздела</h1>
			<SectionPicker
				sectionKey={sectionKey}
				setSectionKey={setSectionKey} // передаём корректно
			/>

			{sectionKey && (
				<div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
					<div className="text-sm text-gray-600">Вы выбрали раздел:</div>
					<div className="font-medium">{sectionKey}</div>
				</div>
			)}
		</div>
	);
}
