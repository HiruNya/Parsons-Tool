export default function DataLogObject({ dataLog, setSelected }) {
  return (
    <tr className="border-b" title={JSON.stringify(dataLog)} onClick={() => setSelected(dataLog)}>
      <td className="pl-4">{dataLog.parsonsProblem.name}</td>
      <td className="pl-4">{dataLog.user.experimentGroup}</td>
      <td className="pl-4">{dataLog.timeMin}</td>
      <td className="pl-4">{dataLog.timeSec}</td>
    </tr>
  );
}
