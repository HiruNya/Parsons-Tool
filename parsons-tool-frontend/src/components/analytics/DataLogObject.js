export default function DataLogObject({ dataLog }) {
  return (
    <div>
      <p>
        {dataLog.parsonsProblem.name}, time={dataLog.timeMin}, group={dataLog.user.experimentGroup}
      </p>
    </div>
  );
}
