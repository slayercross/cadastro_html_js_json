import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://apeammhaanpwtuwrxeze.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZWFtbWhhYW5wd3R1d3J4ZXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDA2NzcsImV4cCI6MjA3NTQ3NjY3N30.BuMnfZrM1mfJIP4XFWJg2lf7TOx8GocLVDp2FM-Uti8'

const supabse = createClient(SUPABSE_URL, SUPABSE_ANON_KEY)

	document.getElementById('btn').addEventListener('click', async () => {
	const{ data,error } = await supabase
		.from('public.Usuarios')
		.select('id,login,senha,status,dataCriacao')

	if (error) {
		document.getElementByID('saida').textContent = 'Error: ' + error.message
	} else {
		document.getElementByID('saida').textContent = JSON.stringify(data, null, 2)
	}
})





