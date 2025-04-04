const Header = ({ courseName }) => <h1>{ courseName }</h1>   

const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} partName={part.name} exerciseCount={part.exercises} />)}
      </>
    )
}

const Part = ({ partName, exerciseCount }) => {
    return (
      <p>{partName} {exerciseCount}</p>
    )
}

const Total = ({ parts }) => {
    return (
      <b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course