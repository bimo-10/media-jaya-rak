import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apakah rak ini bisa menahan beban yang sangat berat?",
    answer:
      "Ya. Rak kami menggunakan besi hollow tebal dengan konstruksi yang diperkuat sehingga mampu menahan beban berat tanpa melengkung, cocok untuk kebutuhan minimarket maupun gudang.",
  },
  {
    question: "Harganya lebih mahal dibanding rak besi biasa, kenapa?",
    answer:
      "Investasi lebih tinggi sebanding dengan kualitas material tebal, finishing powder coating anti karat, serta daya tahan jangka panjang sehingga lebih hemat karena tidak perlu sering ganti.",
  },
  {
    question: "Apakah Anda melayani pengiriman ke luar pulau Jawa?",
    answer:
      "Kami melayani pengiriman ke seluruh Indonesia, termasuk subsidi ongkos kirim untuk wilayah luar Jawa.",
  },
  {
    question: "Bagaimana cara pemasangannya? Apakah sulit?",
    answer:
      "Rak dirancang dengan desain modular yang mudah dirakit. Kami juga menyediakan layanan perakitan gratis untuk memastikan pemasangan rapi dan cepat.",
  },
];

export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-base font-medium">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
