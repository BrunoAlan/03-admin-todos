export const TabBar = () => {
    return (
        <div className='grid w-full grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2'>
            <div>
                <input type='radio' id='1' className='peer hidden' />
                <label className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
                    1
                </label>
            </div>

            <div>
                <input type='radio' id='2' className='peer hidden' />
                <label className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
                    2
                </label>
            </div>

            <div>
                <input type='radio' id='3' className='peer hidden' />
                <label className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
                    3
                </label>
            </div>

            <div>
                <input type='radio' id='4' className='peer hidden' />
                <label className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
                    4
                </label>
            </div>
        </div>
    );
};
