import { FACETS } from "../content";
import { ImageSlot } from "./ImageSlot";
import { SectionHeading } from "./SectionHeading";

export function WhatIsIfa() {
  return (
    <section id="learn" className="bg-ifa-paper px-10 pb-[120px] pt-[110px] text-ifa-ink">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="01" title="What is Ifá?" light />
        <div className="mt-[22px] grid grid-cols-[1fr_400px] items-center gap-11">
          <p className="m-0 text-[17.5px] leading-[1.7] text-ifa-ink/75">
            Ifá is a body of knowledge of the Yorùbá people of West Africa — a living tradition
            carried across Nigeria, Benin and Togo, and throughout the Americas. It is not magic. It
            is a system of memory, ethics and decision-making, transmitted orally for centuries
            through the wisdom of Ọ̀rúnmìlà and the training of the babaláwo and ìyánífá.
          </p>
          <div className="rounded-[14px] border border-ifa-border/25 bg-ifa-parchment p-2.5 shadow-[0_16px_36px_rgba(36,27,20,.14)]">
            <div className="h-[280px] overflow-hidden rounded-lg">
              <ImageSlot
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Ifa%20divination%20tray%20(%20Opele%20Ifa).jpg?width=900"
                alt="A carved Ifá divination tray (ọpọn Ifá)"
                placeholder="Drop a photo of an Ọpọn Ifá"
                credit="Wiki Loves Monuments Nigeria — CC BY-SA 4.0"
                creditHref="https://commons.wikimedia.org/wiki/File:Ifa_divination_tray_(_Opele_Ifa).jpg"
              />
            </div>
            <div className="px-1.5 pb-1 pt-2.5 font-mono text-[10.5px] text-ifa-ink/55">
              A carved divination tray (ọpọn Ifá), photographed in a Nigerian museum collection.
            </div>
          </div>
        </div>
        <div className="mt-[52px] grid grid-cols-3 gap-[18px]">
          {FACETS.map((f) => (
            <div
              key={f.num}
              className="rounded-[14px] border border-ifa-border/[0.16] bg-ifa-parchment px-6 py-[26px] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(36,27,20,.12)]"
            >
              <div className="mb-3 font-mono text-xs text-ifa-rust">{f.num}</div>
              <h3 className="m-0 font-serif text-[23px] font-medium">{f.title}</h3>
              <p className="mb-0 mt-2.5 text-[14.5px] leading-[1.65] text-ifa-ink/70">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
