export function Footer() {
  return (
    <footer className="border-t border-border bg-[oklch(0.14_0.015_220)] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          <div>
            <p className="font-serif text-lg font-bold text-white">
              Dr. Guilherme Carvalho
            </p>
            <p className="mt-2 text-sm text-white/60">
              Fisioterapeuta Clínico
            </p>
            <p className="mt-1 text-sm text-white/60">
              CREFITO 1 318268-F
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Navegação
            </p>
            <nav className="mt-3 flex flex-col gap-2">
              <a href="#sintomas" className="text-sm text-white/60 hover:text-white transition-colors">
                Sintomas
              </a>
              <a href="#tratamentos" className="text-sm text-white/60 hover:text-white transition-colors">
                Tratamentos
              </a>
              <a href="#sobre" className="text-sm text-white/60 hover:text-white transition-colors">
                Sobre
              </a>
              <a href="#localizacao" className="text-sm text-white/60 hover:text-white transition-colors">
                Localização
              </a>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Contato
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-sm text-white/60">
                Rua João Pessoa, 198 - Sala 406
              </p>
              <p className="text-sm text-white/60">
                Cidade Alta, Natal - RN
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            {"© "}{new Date().getFullYear()} Dr. Guilherme Carvalho. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
