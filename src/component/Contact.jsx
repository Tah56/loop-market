"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-black py-28">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-green-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
            Contact Us
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Let's Talk
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
            Have questions, suggestions, or need support? We'd love to hear
            from you. Reach out and our team will get back to you as soon as
            possible.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                  <Mail className="text-green-400" size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">Email Us</h3>
                  <p className="text-zinc-400">
                    support@loopmarket.com
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                  <Phone className="text-green-400" size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">Call Us</h3>
                  <p className="text-zinc-400">
                    +880 1234-567890
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                  <MapPin className="text-green-400" size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-zinc-400">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[32px] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl"
          >
            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full rounded-2xl border border-zinc-700 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-2xl border border-zinc-700 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-green-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-500"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Your feedback helps us build a better marketplace.
          </h3>

          <p className="mt-4 text-green-400">
            Loop Market • Buy Smart • Sell Fast • Reuse Everything
          </p>
        </motion.div>
      </div>
    </section>
  );
}

