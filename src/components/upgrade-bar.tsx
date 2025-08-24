import React from 'react';

export function UpgradeBar({ total }) {
	const steps = [5, 10, 15, 20, 30, 50];
	return (
		<div className="mt-2 flex items-center gap-2 justify-center">
			{steps.map((s, i) => (
				<div
					key={i}
					className="flex flex-col items-center text-[10px] text-gray-500"
				>
					<div
						className={`w-6 h-6 rounded-full border ${
							total >= s
								? 'bg-emerald-500 border-emerald-600'
								: 'bg-gray-100 border-gray-200'
						}`}
					></div>
					<div>{s}</div>
				</div>
			))}
		</div>
	);
}
