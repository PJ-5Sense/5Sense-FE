export default function SelectForm({ initialValue, handleValue, activeOption, handleOption, OptionList }: any) {
  return (
    <div className="w-full flex flex-col flex-grow gap-1 ">
      <button
        className={`flex justify-between items-center w-full h-[52px] px-4 py-3.5 bg-white rounded-lg border ${
          activeOption ? 'border-primary-600' : 'border-gray-300`'
        }`}
        onClick={handleOption}
      >
        <span className="h-full gray-500-normal text-sm leading-[17.50px]">{initialValue}</span>
        <span className="w-4 h-4 leading-[17.50px]">{activeOption ? '▲' : '▼'}</span>
      </button>
      {activeOption && (
        <ul className="w-[124px] h-[184px] overflow-auto p-1 bg-white rounded-md shadow border border-primary-600 z-50">
          {OptionList.map((item: string, i: number) => (
            <li
              className={`w-full h-[42px] px-3 py-2.5 ${
                initialValue === item ? 'text-gray-900 hover:text-primary-600' : 'text-gray-500'
              } bg-white hover:bg-violet-100 rounded-[3px] justify-start cursor-pointer`}
              key={i}
              value={item}
              onClick={() => handleValue(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
