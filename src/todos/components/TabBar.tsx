'use client';

const TAB_OPTIONS = [1, 2, 3, 4];

interface Props {
    currentTab?: number;
    tabOptions?: number[];
}
export const TabBar = ({ tabOptions = TAB_OPTIONS, currentTab = 1 }: Props) => {
    const gridClass = `grid-cols-${tabOptions.length}`;

    return (
        <div
            className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${gridClass} `}
        >
            {tabOptions.map((tab) => (
                <div key={tab}>
                    <input
                        type='radio'
                        id={tab.toString()}
                        className='peer hidden'
                    />
                    <label className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
                        {tab}
                    </label>
                </div>
            ))}
        </div>
    );
};
