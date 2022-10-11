

const Chart = ({key, chart}: any) => {
  return (
    <div className="flex justify-center items-center border border-slate-900">
        <div className="flex justify-center items-center border border-slate-100">
            <p>{`Chart: ${chart}`}</p>
        </div>
    </div>
  )
}

export default Chart