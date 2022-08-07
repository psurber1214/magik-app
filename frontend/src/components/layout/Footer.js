import { MdOutlineConnectWithoutContact } from 'react-icons/md'

function Footer() {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='footer p-10 bg-slate-500 text-primary-content footer-center'>
      <div>
        <MdOutlineConnectWithoutContact className='inline pr-2 text-3xl' />
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
