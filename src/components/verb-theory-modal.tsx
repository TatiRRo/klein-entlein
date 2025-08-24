import React from 'react';

interface VerbTheoryModalProps {
	open: boolean;
	onClose: () => void;
	verbs: {
		infinitiv: string;
		translation: string;
		prateritum: string[];
		partizip2: string;
	}[];
}

export function VerbTheoryModal({ open, onClose, verbs }: VerbTheoryModalProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
			<div className="absolute inset-x-2 top-4 bottom-4 max-w-sm mx-auto bg-white rounded-2xl shadow-xl p-4 flex flex-col">
				<div className="flex items-center justify-between mb-3">
					<div className="font-semibold text-lg">Теория: Глаголы</div>
					<button onClick={onClose} className="text-xs text-gray-500">
						Закрыть
					</button>
				</div>

				<div className="overflow-y-auto flex-1 pr-1">
					<table className="w-full text-sm border-collapse">
						<thead>
							<tr className="border-b text-left text-gray-600">
								<th className="py-1">Инфинитив</th>
								<th className="py-1">Prät.</th>
								<th className="py-1">Partizip II</th>
							</tr>
						</thead>
						<tbody>
							{verbs.map((v, i) => (
								<tr key={i} className="border-b last:border-0">
									<td className="py-1">
										{v.infinitiv}{' '}
										<span className="text-gray-400">({v.translation})</span>
									</td>
									<td className="py-1">{v.prateritum.join(', ')}</td>
									<td className="py-1 font-semibold">{v.partizip2}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
