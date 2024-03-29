'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
 
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='text-center'>
            <h3 className='display-4 fw-bold'>{error?.message}</h3>
            <p className='fs-3'>
                <span className='text-danger'>Oop!</span> Something went wrong!
            </p>
            <p className='lead'>Sorry for inconvience</p>
            <button onClick={() => reset?.()}>Try Again</button>
        </div>
      </div>
    </div>
  )
}