import React from 'react';
import { THEORY } from '../constants/theory';
import { SECTIONS } from './categories';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponents = {
	table: ({ node, ...props }) => (
		<div className="table-auto overflow-x-auto my-4">
			<table
				className="min-w-full table-auto border border-gray-400 border-collapse text-center"
				{...props}
			/>
		</div>
	),
	th: ({ node, ...props }) => (
		<th className="border border-gray-400 px-2 py-2 bg-gray-100 text-[12px]" {...props} />
	),
	td: ({ node, ...props }) => (
		<td className="border border-gray-400 px-2 py-2 text-[12px]" {...props} />
	),
	p: ({ node, ...props }) => <p className="my-2" {...props} />,
	li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
	strong: ({ node, ...props }) => (
		<strong className="font-semibold" {...props} />
	),
};
export function TheoryModal({ open, sectionKey, onStart, onClose }) {
	if (!open) return null;
	const title = SECTIONS.find((s) => s.key === sectionKey)?.title || 'Теория';
	const text = THEORY[sectionKey] || 'Теория недоступна.';
	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
			<div className="absolute inset-x-2 top-4 bottom-4 max-w-sm mx-auto bg-white rounded-2xl shadow-xl p-4 flex flex-col">
				<div className="flex items-center justify-between">
					<div className="font-semibold text-lg">{title}</div>
					<button onClick={onClose} className="text-xs text-gray-500">
						Закрыть
					</button>
				</div>
				<div className="mt-3 overflow-y-auto text-sm leading-relaxed flex-1 pr-1">
					{/* <div className="p-6 max-w-3xl mx-auto font-sans"> */}
					{/* {text} */}
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={MarkdownComponents}
					>
						{text}
					</ReactMarkdown>
				</div>
				<div className="pt-3">
					<button
						onClick={onStart}
						className="w-full px-3 py-2 rounded-xl bg-black text-white text-sm"
					>
						Начать упражнения
					</button>
				</div>
			</div>
		</div>
	);
}