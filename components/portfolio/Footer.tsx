"use client"
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="pb-24">
      <Separator />

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <motion.p whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }} className="font-mono">
            © {new Date().getFullYear()} — Built with care
          </motion.p>

          <motion.p whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }}>
            Designed & developed by Luji
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
