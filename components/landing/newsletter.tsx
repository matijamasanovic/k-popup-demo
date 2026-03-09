"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Gift, Sparkles } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Gift className="w-8 h-8 text-primary-foreground" />
          </div>
          
          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance tracking-tight">
            Subscribe & Get 10% Off Your First Order
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-lg mx-auto text-pretty">
            Join our newsletter for exclusive deals, new product announcements, and delicious Korean recipes.
          </p>
          
          {/* Form */}
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-4 py-3 h-12 bg-white border-0 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
            </div>
            <Button 
              type="submit"
              size="lg"
              className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-8 font-semibold shadow-lg"
            >
              Subscribe
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
          
          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-primary-foreground/80 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>No spam, unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
